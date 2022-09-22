import { NavLink } from 'react-router-dom';
import styles from './Controls.module.scss';

const Controls = ({ link, title }) => {
  return (
    <nav>
      <NavLink
        to={link}
        className={({ isActive }) =>
          isActive ? styles.button__active : styles.button
        }
      >
        {title}
      </NavLink>
    </nav>
  );
};

export default Controls;
