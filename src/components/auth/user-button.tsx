"use client";

import React, { useContext } from "react";
import { UserContext } from "@/hooks/user.provider"; 


const UserButton = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return null;
  }

  const { user, status, error, refetch } = userContext;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <>
        <p>User not authenticated</p>
        <button onClick={refetch}>Retry</button> {/* Retry to refetch the profile */}
      </>
    );
  }

  if (status === "authenticated" && user) {
    return (
      <div className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={user.image || "/default-avatar.png"} alt="User avatar" className="size-10 rounded-full" />
        <div>
          <p className="font-medium">{user.name || "Anonymous User"}</p>
          <p className="text-xs text-muted-foreground">{user.email || "No email available"}</p>
        </div>
        <button onClick={refetch}>Refresh Profile</button> {/* Trigger refetch */}
      </div>
    );
  }

  return error ? (
    <>
      <p>{error.message}</p>
      <button onClick={refetch}>Retry</button> {/* Retry button in case of error */}
    </>
  ) : null;
};

export default UserButton;
