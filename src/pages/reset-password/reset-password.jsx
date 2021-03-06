import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password.module.css';
import { resetPassword, clearPwdResetErr, resetPasswordResetPageToInitial  } from '../../services/actions/user';
import Notification from "../../components/notification/notification";
import { Redirect, useLocation } from 'react-router-dom';

export const ResetPasswordPage = () => {

  const { user, errMessage, passwordResetRequest, passwordResetErr, isPasswordReset } = useSelector(
    (store) => store.user
  );

  const [token, setToken] = useState('');
  const [password, setPassword] = useState("");
  
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onCodeChange = (e) => {
    setToken(e.target.value);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(resetPassword(password, token));
    },
    [dispatch, password, token]
  );

  useEffect(() => {
		if (isPasswordReset) {
			dispatch(resetPasswordResetPageToInitial());
			history.push("/login");
		}
	}, [isPasswordReset, history, dispatch]);


  const resetError = useCallback(() => {
    dispatch(clearPwdResetErr());
  }, [dispatch]);

  if (user) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  return (
    <main className={styles.wrapper}>
       {!passwordResetRequest && !passwordResetErr && (
      <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1
          className={`${styles.title} text text_type_main-medium mb-6`}
        >
          Восстановление пароля
        </h1>
        <PasswordInput
          onChange={onPasswordChange}
          value={password}
          name="password"
          placeholder="Введите новый пароль"
        />
        <div className="mb-6 mt-6">
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={onCodeChange}
            value={token}
            name="e-mail"
            error={false}
            errorText="Ошибка"
            size="default"
            ref={inputRef}
          />
        </div>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        {"Вспомнили пароль? "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
      </>
      )}
      {!passwordResetRequest && passwordResetErr && (
        <Notification
          heading='Произошла ошибка.'
          message={errMessage}
          onClose={resetError}
          backHome
        />
      )}
    </main>
  );
};