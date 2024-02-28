// PointContext.js
import React, { createContext, useContext, useState } from 'react';

const PointContext = createContext();

export const PointProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  const updatePoints = (newPoints) => {
    setPoints(newPoints);
  };

  return (
    <PointContext.Provider value={{ points, updatePoints }}>
      {children}
    </PointContext.Provider>
  );
};

export const usePointContext = () => {
  return useContext(PointContext);
};
