import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ControlsMobile.module.scss';

const ControlsMobile = ({ link, title }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive ? styles.button__active : styles.button
      }
    >
      {title}
    </NavLink>
  );
};

export default ControlsMobile;
