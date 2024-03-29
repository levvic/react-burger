import React, { useRef, FC, DetailedHTMLProps, HTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import styles from './notification.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';
import { clearPwdRecoverErr, clearPwdResetErr } from '../../services/actions/user';

const rootNotifications = document.getElementById('notifications');

interface INotification extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  heading?: string;
  message?: string;
  backHome?: boolean;
  onClose?: () => void;
}

const Notification:FC<INotification> = ({ heading, message, backHome, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  

  const dispatch = useAppDispatch();
  const cleanError = () => {
    dispatch(clearPwdRecoverErr());
    dispatch(clearPwdResetErr());
    onClose && onClose();
    containerRef?.current != null && containerRef.current.classList.add(styles.notification_closed);
  };

  return ReactDOM.createPortal(
    <div className={styles.notification} ref={containerRef}>
      <h2 className={`${styles.notification__title} text text_type_main-default mb-4`}>
        {heading}
      </h2>
      {message && (
        <p className={`${styles.notification__errMessage} text text_type_main-default mb-10`}>
          {message}
        </p>
      )}
      <div className={styles.notification__controls}>     
        
        {backHome && (
          <Link onClick={() => cleanError()} className={`${styles.notification__homeLink} text text_type_main-default`} to={'/'}>
            Вернуться на главную
          </Link>
        )}
      </div>
      
    </div>,
    rootNotifications!
  );
};

export default Notification;
