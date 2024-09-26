import { auth } from "@/auth/core";
import { redirect } from "next/navigation";
import { cache } from "react";


const getServerSession = cache(async () => auth());

export default getServerSession;


export async function SignedIn({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  // If the user is not signed in, return null or handle appropriately
  if (!session?.user) return null;

  return <div>{children}</div>;
}


export async function SignedOut({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  // If the user is signed in, return null or handle appropriately
  if (session?.user) return null;

  return <>{children}</>;
}


export async function protectRoute(next: string = '/') {
  const session = await getServerSession();

  if (!session?.user) {
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  return session;
}

/*
export async function protectRouteWithRole(role: string = "admin", next: string = '/') {
  const session = await getServerSession();

  if (!session?.user || session.user.role !== role) {
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  return session;
}
*/



export async function redirectOnAuth(redirectTo: string = '/') {
  const session = await getServerSession();

  if (session?.user) {
    redirect(redirectTo);
  }
}