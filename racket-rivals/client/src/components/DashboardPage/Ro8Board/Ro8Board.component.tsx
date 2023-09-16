import { ChangeEvent, FC, FormEvent, useEffect } from "react";
import { ITournament } from "../../../services/tournaments/interfaces/tournamentInterface";
import { useAppDispatch, useAppSelector } from "../../../hooks/store/useStore";
import { updateTournamentForm } from "../../../store/slice/tournamentForm";
import { format, parseISO } from "date-fns";
import { useUpdateTournamentMutation } from "../../../services/tournaments/endpoints";
import { convertToHTMLTimeFormat } from "../../../utils/time";
import { useNavigate } from "react-router-dom";
import styles from "./Ro8Board.module.scss";

interface Ro8BoardProps {
  tournament: ITournament;
}

export const Ro8Board: FC<Ro8BoardProps> = ({ tournament }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [updateTournament, { isLoading, isSuccess }] =
    useUpdateTournamentMutation();
  const formData = useAppSelector((state) => state.tournamentForm);
  const formatDate = (isoDateString: string) => {
    const dateObject = parseISO(isoDateString);
    return format(dateObject, "yyyy-MM-dd");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "number_of_participants" || name === "price"
        ? parseInt(value)
        : value;
    dispatch(updateTournamentForm({ [name]: updatedValue }));
  };

  useEffect(() => {
    const initialData = {
      ...tournament,
      start_date: formatDate(tournament.start_date),
      end_date: formatDate(tournament.end_date),
      contact: {
        email: tournament.contact.email,
        phone: tournament.contact.phone,
      },
    };

    dispatch(updateTournamentForm(initialData));
  }, [dispatch, tournament]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateTournament({
        tournament: formData,
        tournamentId: tournament._id,
      }).unwrap();
    } catch (err) {
      console.error("Erreur lors de la mise à jour du tournoi:", err);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.updateFormTournament} onSubmit={handleSubmit}>
        <label>
          Nom:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Date de début:
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
          />
        </label>
        <label>
          Date de fin:
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
          />
        </label>
        <label>
          Heure de début:
          <input
            type="time"
            name="start_hour"
            value={convertToHTMLTimeFormat(formData.start_hour)}
            onChange={handleChange}
          />
        </label>
        <label>
          Lieu:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Format:
          <select name="format" value={formData.format} onChange={handleChange}>
            <option value="Round Robin">Round Robin</option>
          </select>
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Nombre de participants:
          <select
            required
            name="number_of_participants"
            value={formData.number_of_participants.toString()}
            onChange={handleChange}
          >
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
        </label>
        <label>
          Accessibilité:
          <select
            required
            name="accesibility"
            value={formData.accesibility}
            onChange={handleChange}
          >
            <option value="private">Privé</option>
            <option value="public">Public</option>
          </select>
        </label>
        <label>
          Price:
          <input
            required
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Contact mail:
          <input
            type="email"
            name="contact"
            value={formData.contact.email}
            onChange={handleChange}
            placeholder="Contact mail"
          />
        </label>
        <label>
          Contact téléphone:
          <input
            type="tel"
            name="contact"
            value={formData.contact.phone}
            onChange={handleChange}
            placeholder="Contact téléphone"
          />
        </label>
        <button className={styles.UpdateTournamentFormBtn} type="submit">
          Mettre à jour
        </button>
      </form>

      <div
        className={styles.goToUpdateMatchPage}
        onClick={() => navigate(`/dashboard/${tournament._id}/matchs`)}
      >
        Rentrer les résultats des matchs
      </div>
    </div>
  );
};

Ro8Board.displayName = "Ro8Board";
