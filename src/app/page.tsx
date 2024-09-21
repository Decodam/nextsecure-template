import { Button } from "@/components/ui/button";
import { ArrowUpRight, Database, File, Globe, Shield, UserIcon } from "lucide-react";
import Link from "next/link";

export default function Home({}) {
  
  return (
    <div className="container min-h-screen flex flex-col gap-8 justify-center items-center">
      <Link href={"/"} className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
        NextSecure
      </Link>

      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">
          Get started by editing{" "}
          <code className="bg-muted px-1 py-0.5 rounded font-semibold">
            src/app/page.tsx
          </code>
          .
        </li>
        <li>Save and see your changes instantly.</li>
      </ol>

      <div className="flex items-center gap-4">
        <Button asChild>
          <Link 
            className="flex items-center gap-2" 
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe size={18} /> <span>Deploy Now</span>
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link className="flex items-center gap-2" href={"/login"}>
            <UserIcon size={18} /> <span>See Demo</span>
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4 max-sm:flex-col">
        <Link 
          className="flex text-sm items-center gap-1" 
          target="_blank"
          href={"https://www.prisma.io/docs/getting-started"}
        >
          <Database size={18} /> <span className="underline underline-offset-2">Prisma ORM</span>
        </Link>
        <span className="max-sm:hidden">{`|`}</span>
        <Link 
          className="flex text-sm items-center gap-1" 
          target="_blank"
          href={"https://authjs.dev/getting-started/authentication"}
        >
          <Shield size={18} /> <span className="underline underline-offset-2">Auth.js</span>
        </Link>
        <Link 
          className="flex text-sm items-center gap-1" 
          href={"https://nextjs.org/docs"}
          target="_blank"
        >
          <File size={18} /> <span className="underline underline-offset-2">Next.js</span>
        </Link>
        <span className="max-sm:hidden">{`|`}</span>
        <Link 
          className="flex text-sm items-center gap-1" 
          target="_blank"
          href={"https://authjs.dev/getting-started/authentication"}
        >
          <ArrowUpRight size={18} /> <span className="underline underline-offset-2">NextSecure Docs</span>
        </Link>
      </div>
    </div>
  );
}