import { FC, ReactNode } from "react";
import { MdClose } from "react-icons/md";
import { useAppDispatch } from "../../hooks/store/useStore";
import { setModal } from "../../store/slice/modals";
import styles from "./ModalTemplate.module.scss";

interface ModalsProps {
  children: ReactNode;
  visible: boolean;
  name: string;
}

export const ModalTemplate: FC<ModalsProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.modalBackground}>
      <div className={styles.containerModal}>
        <MdClose
          onClick={() => dispatch(setModal({ name: "", visible: false }))}
          className={styles.close}
        />
        {children}
      </div>
    </div>
  );
};
