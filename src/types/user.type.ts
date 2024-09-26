
export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  role: "user" | "admin" | "superuser";
  activatedAccount: boolean;
  emailVerified: Date | null;
  image: string | null;
  accounts: Array<{
    provider: string;
    type: string;
  }>;
}
