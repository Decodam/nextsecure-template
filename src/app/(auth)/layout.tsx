import { redirectOnAuth } from "@/auth/session";


export default async function Layout({children}:{children:React.ReactNode}) {
  await redirectOnAuth();

  return (
    <div>
      {children}
    </div>
  );
}