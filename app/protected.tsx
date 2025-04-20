import { Slot, Redirect } from "expo-router";
import React from "react";

// Mock authentication hook
const useAuth = () => {
  return { user: { id: 1 } };
};

export default function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}
