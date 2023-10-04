import { TournamentModel } from "../models/Tournaments.js";
import { UserModel } from "../models/Users.js";
import { generateUniqueCode } from "../utils/uniqueCodeGenerator.js";
import { generateMatchsForTournamentRo8 } from "../utils/generateMatchsForTournament.js";
import { updateEliminationMatchesWithParticipants } from "../utils/updateEliminationMatchesWithParticipants.js";

export const getTournaments = async (req, res) => {
  try {
    const page = parseInt(req.query.page || "1");
    const pageSize = parseInt(req.query.pageSize || "10");

    const totalTournaments = await TournamentModel.countDocuments();

    const skip = (page - 1) * pageSize;

    const tournaments = await TournamentModel.find()
      .select("name uniqueCode start_date _id")
      .skip(skip)
      .limit(pageSize);

    const endItem = skip + tournaments.length - 1;
    res.setHeader("Content-Range", `${skip}-${endItem}/${totalTournaments}`);

    res.status(200).json(tournaments);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const registerToTournament = async (req, res) => {
  try {
    const tournamentId = req.body.tournamentId;
    const userId = req.body.userId;

    const tournament = await TournamentModel.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ message: "Tournoi introuvable." });
    }

    if (tournament.organizer._id === userId) {
      return res
        .status(400)
        .json({ message: "L'organisateur ne peut pas participer au tournoi." });
    }

    if (tournament.participants.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Utilisateur déjà inscrit au tournoi." });
    }

    if (tournament.participants.length >= tournament.number_of_participants) {
      return res
        .status(400)
        .json({ message: "Le tournoi a atteint sa limite de participants." });
    }

    tournament.participants.push(userId);

    await tournament.save();

    res.status(200).json(tournament);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de l'inscription." });
  }
};

export const unregisterFromTournament = async (req, res) => {
  try {
    const tournamentId = req.body.tournamentId;
    const userId = req.body.userId;

    const tournament = await TournamentModel.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ message: "Tournoi introuvable." });
    }

    if (!tournament.participants.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Utilisateur non inscrit au tournoi." });
    }

    tournament.participants.pull(userId);

    await tournament.save();

    res.status(200).json(tournament);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de la désinscription." });
  }
};

export const getMyTournaments = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const tournaments = await TournamentModel.find({
      $or: [{ organizer: userId }, { participants: userId }],
    })
      .populate("organizer", "email firstName lastName club")
      .populate("participants", "firstName lastName club rank")
      .skip(skip)
      .limit(pageSize);

    const totalTournaments = await TournamentModel.countDocuments({
      $or: [{ organizer: userId }, { participants: userId }],
    });

    const contentRange = `tournaments ${skip}-${
      skip + tournaments.length - 1
    }/${totalTournaments}`;
    res.setHeader("Content-Range", contentRange);

    if (tournaments.length > 0) {
      res.status(200).json(tournaments);
    } else {
      res.status(404).json({ message: "Aucun tournoi trouvé" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getTournament = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;
    const result = await TournamentModel.findById(tournamentId)
      .populate("organizer", "email firstName lastName club")
      .populate({
        path: "participants",
        select: "firstName lastName club rank",
        options: { sort: { rank: -1 } },
      })
      .populate("matchs", "round player1 player2 score winner nextMatchId");

    if (result) {
      const sortedParticipants = [...result.participants].sort(
        (a, b) => b.rank - a.rank,
      );

      result.seeds = sortedParticipants.map((participant) => participant._id);

      await result.save();

      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Tournoi non trouvé" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const newTournament = async (req, res) => {
  try {
    const uniqueCode = await generateUniqueCode();
    const {
      organizer = req.user.id,
      name,
      start_date,
      end_date,
      start_hour,
      location,
      format,
      description,
      number_of_participants,
      accesibility,
      contact,
      price,
    } = req.body;

    const organizerExists = await UserModel.findById(organizer);
    if (!organizerExists) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const tournament = await TournamentModel.findOne({ name });
    if (tournament) {
      return res.status(400).json({ message: "Tournament already exists" });
    }

    const newTournament = new TournamentModel({
      organizer,
      name,
      start_date,
      end_date,
      start_hour,
      location,
      format,
      description,
      number_of_participants,
      accesibility,
      contact,
      price,
      uniqueCode,
    });

    await newTournament.save();

    if (
      newTournament.format === "Round Robin" &&
      newTournament.number_of_participants === 8
    ) {
      const matchs = await generateMatchsForTournamentRo8(newTournament._id);

      newTournament.matchs = matchs.map((match) => match._id);
      await newTournament.save();
    }

    res.status(201).json(newTournament);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Une erreur est survenue lors de la création du tournoi",
    });
  }
};

export const updateTournament = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;
    const updates = req.body;

    const tournament = await TournamentModel.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ message: "Tournoi introuvable." });
    }

    for (let key in updates) {
      tournament[key] = updates[key];
    }

    await tournament.save();

    res.status(200).json(tournament);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Une erreur est survenue lors de la mise à jour du tournoi.",
    });
  }
};

export const launchTournament = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;
    const organizerId = req.user.id;

    const tournament = await TournamentModel.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ message: "Tournoi introuvable." });
    }

    if (organizerId !== tournament.organizer._id.toString()) {
      return res
        .status(403)
        .json({ message: "L'organisateur ne correspond pas." });
    }

    if (tournament.participants.length !== tournament.number_of_participants) {
      return res
        .status(400)
        .json({ message: "Le nombre de participants n'est pas complet." });
    }

    const updatedTournament =
      await updateEliminationMatchesWithParticipants(tournament);

    tournament.matchs = updatedTournament.matchs.map((match) => match._id);
    await tournament.save();

    res
      .status(200)
      .json({ message: "Le tournoi a été lancé avec succès!", tournament });
  } catch (err) {
    console.error(err);

    if (
      err.message ===
      "Les matchs ont déjà été configurés avec les participants actuels."
    ) {
      return res.status(400).json({ message: err.message });
    }

    res.status(500).json({ message: "Erreur lors du lancement du tournoi." });
  }
};

export const searchTournaments = async (req, res) => {
  try {
    const { query, page = 1, pageSize = 10 } = req.query;

    let searchCriteria = {};

    if (query) {
      searchCriteria = {
        $or: [
          { location: new RegExp(query, "i") },
          { uniqueCode: query },
          { name: new RegExp(query, "i") },
        ],
      };
    }

    const skip = (page - 1) * pageSize;

    const tournaments = await TournamentModel.find(searchCriteria)
      .skip(skip)
      .limit(Number(pageSize));

    const totalTournaments =
      await TournamentModel.countDocuments(searchCriteria);

    res.header(
      "Content-Range",
      `${skip}-${skip + tournaments.length}/${totalTournaments}`,
    );
    res.status(200).send(tournaments);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erreur lors de la recherche des tournois." });
  }
};
