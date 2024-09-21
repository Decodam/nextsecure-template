"use client";
import { Button } from "@/components/ui/button";
import { OAuthProviders } from "@/auth/provider"; 

interface OauthProvider {
  provider: string;
  icon: React.ElementType; // Type for the icon component
}

interface OauthButtonsProps {
  handleClick?: (provider: string) => void;
  nextUrl?: string;
  formBelow?: boolean;
}

export default function OauthButtons({ handleClick, nextUrl, formBelow }: OauthButtonsProps) {
  if (!OAuthProviders || OAuthProviders.length === 0) return null;

  const handleOauthLogin = async (provider: string) => {
    console.log(`OAuth login for provider: ${provider} with next url: ${nextUrl}`);
    // Placeholder for OAuth login logic:
    /*
    const auth_error = await LoginWithOAuthProvider(provider, nextUrl);
    if (auth_error && !auth_error.success) {
      console.error(auth_error.message);
    }
    */
  };

  const gridClasses = OAuthProviders.length === 4 ? "grid grid-cols-2 gap-4" : "space-y-2";

  return (
    <div className={`flex ${formBelow ? "flex-col-reverse" : "flex-col"} gap-4`}>
      <span className="flex items-center">
        <span className="h-px flex-1 bg-border"></span>
        <span className="shrink-0 text-muted-foreground text-xs px-6">Or, Continue with</span>
        <span className="h-px flex-1 bg-border"></span>
      </span>

      <div className={`${OAuthProviders.length > 3 ? gridClasses : "flex items-center gap-4"}`}>
        {OAuthProviders.map(({ provider, icon: Icon }: OauthProvider) => (
          <Button
            onClick={() => {
              if (handleClick) {
                handleClick(provider);
              } else {
                handleOauthLogin(provider);
              }
            }}
            className="w-full space-x-2"
            variant="outline"
            size="lg"
            key={provider}
          >
            <Icon />
            {/* Conditions for showing provider names or "Continue with {provider}" */}
            {(OAuthProviders.length === 2 || OAuthProviders.length === 4) && (
              <span className="capitalize">{provider}</span>
            )}
            {OAuthProviders.length === 3 && null}
            {(OAuthProviders.length < 2 || OAuthProviders.length > 4) && (
              <span className="capitalize">Continue with {provider}</span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
