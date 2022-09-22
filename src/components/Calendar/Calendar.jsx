import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mui/material/Icon';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import styles from './Calendar.module.scss';
import sprite from '../../images/sprite.svg';
import GlobalContext from '../../context/GlobalContext';
import enLocale from 'date-fns/locale/en-US';
import ukLocale from 'date-fns/locale/uk';
import { useTranslation } from 'react-i18next';

const materialTheme = createTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#FF751D',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {},
    },

    // Hover color for icon
    MuiInput: {
      root: {
        '&:hover svg': {
          fill: '#FF751D',
        },
      },
    },
    MuiPickersDay: {
      day: {
        color: '#f88a46',
      },
      daySelected: {
        backgroundColor: '#FF751D',
      },
      dayDisabled: {
        color: '#C7CCDC',
      },
      current: {
        color: '#FF751D',
      },
    },
    MuiButton: {
      textPrimary: {
        color: '#FF751D',
      },
    },
    MuiTypography: {
      colorPrimary: {
        color: '#FF751D',
      },
    },
    MuiInputBase: {
      input: {
        cursor: 'pointer',
      },
    },
  },
});

const Calendar = props => {
  const { t } = useTranslation();
  const { daySelected, setDaySelected } = useContext(GlobalContext);
  const [selectedDate, setSelectedDate] = useState(
    daySelected === null ? new Date() : new Date(daySelected)
  );

  const navigate = useNavigate();
  const location = useLocation();

  function handleQueryChange() {
    const dayQuery = new Date(selectedDate)
      .getDate()
      .toString()
      .padStart(2, '0');
    const monthQuery = (new Date(selectedDate).getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const yearQuery = new Date(selectedDate).getFullYear();

    navigate(
      `${location.pathname}?day=${dayQuery}&month=${monthQuery}&year=${yearQuery}`
    );
  }

  useEffect(() => {
    handleQueryChange();
    setDaySelected(selectedDate);
    props.dateHandler(selectedDate);
  }, [selectedDate, location.pathname]);

  return (
    <ThemeProvider theme={materialTheme}>
      <MuiPickersUtilsProvider
        locale={`${t('calendar')}` === 'enLocale' ? enLocale : ukLocale}
        utils={DateFnsUtils}
      >
        <DatePicker
          disableFuture
          format="dd.MM.yyyy"
          InputProps={{
            disableUnderline: true,
            style: {
              width: 100,
              fontSize: 12,
              fontWeight: 900,
              color: '#52555F',
              cursor: 'pointer',
            },
            startAdornment: (
              <InputAdornment position={'start'}>
                <Icon>
                  <svg className={styles.calendar_icon} width="20" height="20">
                    <use href={`${sprite}#calendar`}></use>
                  </svg>
                </Icon>
              </InputAdornment>
            ),
          }}
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default Calendar;
