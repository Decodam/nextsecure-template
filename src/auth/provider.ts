import { SvgBrandGithub } from "@/components/auth/brands";
import GitHubProvider from "next-auth/providers/github";

/*
  You can add multple oauth providers here. Just add the provider name and icon from @/auth/ui/brands
  config shall include the provider imported from next-auth/providers/github
*/

export const OAuthProviders = [
  {
    provider: "github",
    icon: SvgBrandGithub,
    config: GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  },
];
