import { SvgBrandFacebook, SvgBrandGithub, SvgBrandGoogle } from "@/auth/ui/brands";
import GitHubProvider from "next-auth/providers/github";

export const OAuthProviders = [
  {
    provider: "google",
    icon: SvgBrandGoogle,
    config: GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  },
  {
    provider: "github",
    icon: SvgBrandGithub,
    config: GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  },
  {
    provider: "facebook",
    icon: SvgBrandFacebook,
    config: GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  },
];