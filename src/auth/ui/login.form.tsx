"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { loginFormSchema } from "@/auth/validator"
import Link from "next/link"
import Image from "next/image"
import { PasswordInput } from "./password-input"
import { brand } from "./brands"
import OauthButtons from "./oauth-buttons"



export default function LoginForm({borderless=false, className}:{borderless?:boolean|null, className?:string}) {

  /*
    Login method checks the users hash password and email for credentials login.
  */


  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  
  
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values)
  }


  return(
    <Card className={`w-full max-w-md ${borderless && "border-none shadow-none bg-background" }  max-md:border-none  max-md:shadow-none  max-md:bg-background mx-auto ${className && className}`}>
        <CardHeader className="space-y-1">
          <Link href={"/"} className='mx-auto mb-4 mt-2'>
            <Image height={60} width={60} src={brand.logo} alt="logo" /> 
          </Link>
          <CardTitle className="text-2xl font-bold text-center">
            Login to {` `}        
            <Link href={"/"} className="font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {brand.name}
            </Link>
          </CardTitle>
          <CardDescription className="text-center">
            Choose your preferred login method
          </CardDescription>
        </CardHeader>


        <CardContent className="space-y-8">
          <OauthButtons formBelow />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="u@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide your registered email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link href="/account-recovery" className="ml-auto inline-block text-xs underline">
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button size={"lg"} className="w-full" type="submit">Continue with Email</Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>

        </CardContent>


        <CardFooter>
          <p className="text-xs text-center text-muted-foreground w-full">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
    </Card>
  )
}