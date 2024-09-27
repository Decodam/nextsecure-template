"use client";

import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { fetchUserProfile } from "@/auth/api";
import { UserProfileType } from "@/types/user.type";
import { ResponseMessage } from "@/types/response.type";

// Define the type for context value
type UserContextType = {
  user: UserProfileType | null;
  status: "loading" | "authenticated" | "unauthenticated";
  error: { status: number; message: string } | null;
  refetch: () => void; // Add refetch method
};

// Create the context with the default value
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfileType | null>(null);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");
  const [error, setError] = useState<{ status: number; message: string } | null>(
    null
  );

  const fetchData = useCallback(async () => {
    setStatus("loading");
    const response: ResponseMessage<UserProfileType> = await fetchUserProfile();

    if (response.success) {
      setUser(response.data);
      setStatus("authenticated");
    } else {
      setError(response.error || { status: 500, message: "Unknown error" });
      setStatus("unauthenticated");
    }
  }, []);

  // Use useEffect to fetch data on initial load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Pass the refetch method in the context provider value
  return (
    <UserContext.Provider value={{ user, status, error, refetch: fetchData }}>
      {children}
    </UserContext.Provider>
  );
};
