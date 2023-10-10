import { useState, ChangeEvent, FormEvent, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store/useStore";
import {
  clearTournamentForm,
  updateTournamentForm,
} from "../../../store/slice/tournamentForm";
import { useNewTournamentMutation } from "../../../services/tournaments/endpoints";
import { setModal } from "../../../store/slice/modals";
import { useNavigate } from "react-router-dom";
import styles from "./CreateTournamentFormModal.module.scss";

interface ContactFormModalProps {
  email: string;
  phone: string;
}

export const CreateTournamentFormModal: FC = () => {
  const navigate = useNavigate();
  const storedFormData = useAppSelector((state) => state.tournamentForm);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<ContactFormModalProps>({
    email: "",
    phone: "",
  });
  const [createTournament] = useNewTournamentMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    dispatch(
      updateTournamentForm({
        contact: { ...storedFormData.contact, [name]: value },
      })
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const payload = await createTournament(storedFormData).unwrap();
      dispatch(clearTournamentForm());
      dispatch(setModal({ name: "", visible: false }));
      navigate(`/tournament/${payload._id}/details`);
    } catch (err) {
      console.error("Erreur lors de la création du tournoi:", err);
    }
  };

  return (
    <form className={styles.createTournamentFormModal} onSubmit={handleSubmit}>
      <p>
        Coordonnées auxquelles les participants pourront contacter
        l'organisateur.
      </p>
      <label>
        Email :
        <input
          placeholder="Obligatoire"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Téléphone :
        <input
          placeholder="Facultatif"
          type="tel"
          name="phone"
          value={data.phone}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Envoyer</button>
    </form>
  );
};
