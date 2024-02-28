import React, { createContext, useContext, useState } from 'react';

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budget, setBudget] = useState(0);

  const updateBudget = (newBudget) => {
    setBudget(newBudget);
  };

  const value = {
    budget,
    updateBudget,
  };

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
};

export const useBudgetContext = () => {
  return useContext(BudgetContext);
};
