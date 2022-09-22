import React, { useState } from 'react';
import GlobalContext from './GlobalContext';

const ContextWrapper = props => {
  const [daySelected, setDaySelected] = useState(Date.now);

  return (
    <GlobalContext.Provider value={{ daySelected, setDaySelected }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
export default ContextWrapper;
