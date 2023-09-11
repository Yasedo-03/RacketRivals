import { TournamentModel } from "../models/Tournaments.js";
import { UserModel } from "../models/Users.js";
import { generateUniqueCode } from "../utils/uniqueCodeGenerator.js";
import { generateMatchsForTournamentRo8 } from "../utils/generateMatchsForTournament.js";

export const getTournaments = async (req, res) => {
  try {
    const result = await TournamentModel.find().select(
      "name uniqueCode start_date _id",
    );
    res.status(200).json(result);
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
    const result = await TournamentModel.find({
      $or: [{ organizer: userId }, { participants: userId }],
    })
      .populate("organizer", "email firstName lastName club")
      .populate("participants", "firstName lastName club rank");

    if (result.length > 0) {
      res.status(200).json(result);
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

    res
      .status(201)
      .json({ message: "Tournoi créé avec succès", tournament: newTournament });
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
