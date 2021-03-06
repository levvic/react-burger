import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import { loginUser } from "../../services/actions/user";

export const LoginPage = () => {

  const {user} = useSelector((store) => store.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      (location.state && location.state.previousLocation) ? history.push(location.state.previousLocation.pathname) : history.push('/');
    }
  }, [user, history, location]);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(loginUser(email, password));
  };


  return (
    <main className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={`${styles.title} text text_type_main-medium`}>
          Вход
        </h2>
        <div className="mt-6 mb-6">
          <Input
            type="text"
            placeholder="e-mail"
            onChange={onEmailChange}
            value={email}
            name="e-mail"
            error={false}
            ref={inputRef}
            errorText="Ошибка"
            size="default"
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            onChange={onPasswordChange}
            value={password}
            name="password"
            placeholder="Пароль"
          />
        </div>
        <Button disabled={!(email && password)} type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        {"Вы — новый пользователь? "}
        <Link className={styles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        {"Забыли пароль? "}
        <Link className={styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </main>
  );
};