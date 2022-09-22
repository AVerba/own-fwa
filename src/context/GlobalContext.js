import { createContext } from 'react';
import { commonDate } from '../utils/date';

const GlobalContext = createContext({
  daySelected: null,
  setDaySelected: day => {},
});

export default GlobalContext;
