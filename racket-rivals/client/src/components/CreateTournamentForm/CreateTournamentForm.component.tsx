import { ChangeEvent, FormEvent, FC } from "react";
import { setModal } from "../../store/slice/modals";
import { useAppDispatch, useAppSelector } from "../../hooks/store/useStore";
import styles from "./CreateTournamentForm.module.scss";
import { updateTournamentForm } from "../../store/slice/tournamentForm";

export const CreateTournamentForm: FC = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.tournamentForm);

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setModal({ name: "contactFormModal", visible: true }));
  };

  return (
    <form className={styles.createFormTournament} onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          required
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Start Date:
        <input
          required
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
        />
      </label>
      <label>
        End Date:
        <input
          required
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />
      </label>
      <label>
        Start Hour:
        <input
          required
          type="time"
          name="start_hour"
          value={formData.start_hour}
          onChange={handleChange}
        />
      </label>
      <label>
        Location:
        <input
          required
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </label>
      <label>
        Format:
        <select
          required
          name="format"
          value={formData.format}
          onChange={handleChange}
        >
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
        Number of Participants:
        <input
          required
          type="number"
          name="number_of_participants"
          value={formData.number_of_participants}
          onChange={handleChange}
        />
      </label>
      <label>
        Accessibility:
        <select
          required
          name="accesibility"
          value={formData.accesibility}
          onChange={handleChange}
        >
          <option value="private">Private</option>
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
      <button className={styles.CreateTournamentFormBtn} type="submit">
        Créer mon tournoi
      </button>
    </form>
  );
};

CreateTournamentForm.displayName = "CreateTournamentForm";
