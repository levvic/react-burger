import React, { useCallback } from "react";
import { NavLink, useHistory, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './profile.module.css';
import { ProfileForm } from "../../components/profile-form/profile-form";
import { logoutUser, clearPatchUserErr } from "../../services/actions/user";
import { useSelector } from "react-redux";

export const ProfilePage = () => {

  const { user, patchUserRequest, patchUserFailed, isUserChanged, errMessage } = useSelector(
    (store) => store.user
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const refreshToken = localStorage.getItem('refreshToken');

  const handleLogout = useCallback(() => {
    dispatch(logoutUser(refreshToken));

    history.replace({ path: '/login' });
  }, [dispatch, logoutUser, history, refreshToken]);

  const clearErrorMsg = useCallback(() => {
    dispatch(clearPatchUserErr());
  }, [dispatch]);


  return (

    <main className={styles.wrapper}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <NavLink
              activeClassName={styles.link_active}
              className={`${styles.link} text text_type_main-medium`}
              to="/profile"
              exact
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={styles.link_active}
              className={`${styles.link} text text_type_main-medium`}
              exact
              to="/profile/orders"
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <button
              activeClassName={styles.link_active}
              className={`${styles.link} text text_type_main-medium`}
              onClick={handleLogout}
            >
              Выход
            </button>
          </li>
        </ul>
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Route path="/profile" exact>
      {!patchUserRequest && !patchUserFailed && (
        <ProfileForm />
      )}
 </Route>
      

      <Route path="/profile/orders" exact>
        <span className="text text_type_main-default">Скоро здесь будет «История заказов»...</span>
      </Route>
    </main>
  )
};