// src/context/ExpenseContext.jsx
import React, { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Taxi fare to client meeting",
      amount: 150,
      currency: "USD",
      category: "Travel",
      date: "2025-09-01",
      status: "Pending",
      comments: "",
    },
    {
      id: 2,
      title: "Business lunch with client",
      amount: 45.5,
      currency: "USD",
      category: "Meals",
      date: "2025-09-05",
      status: "Approved",
      comments: "Approved - valid business meal",
    },
  ]);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};
