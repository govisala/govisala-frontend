import React, { createContext } from "react";

// Define the type for the context
interface UserDataContextType {
  userData: Record<string, any>;
  setUserData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

// Create a Context with the defined type
export const UserDataContext = createContext<UserDataContextType | any>(null);
