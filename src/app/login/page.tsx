"use client"

import * as React from "react"
import Link from "next/link"
import "./style.css"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"


type TabValue = "signin" | "signup"

export default function AuthPage() {
  const [tab, setTab] = React.useState<TabValue>("signin")

  return (
    <main className="min-h-[100svh] bg-background text-foreground font-sans">
      <section className="container mx-auto px-4">
        <div className="auth-grid-center py-10">
          <header className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-balance">Access your certificates</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in or create an account to manage certificates and competitions.
            </p>
          </header>

          <Card className="w-full max-w-md">
            <Tabs value={tab} onValueChange={(v) => setTab(v as TabValue)} className="w-full">
              <CardHeader>
                <CardTitle className="sr-only">Authentication</CardTitle>
                <CardDescription className="sr-only">
                  Use the tabs to switch between sign in and sign up
                </CardDescription>

                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="signin" aria-controls="signin-panel">
                    Sign in
                  </TabsTrigger>
                  <TabsTrigger value="signup" aria-controls="signup-panel">
                    Sign up
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <TabsContent value="signin" id="signin-panel">
                <SignInForm goToSignUp={() => setTab("signup")} />
              </TabsContent>

              <TabsContent value="signup" id="signup-panel">
                <SignUpForm goToSignIn={() => setTab("signin")} />
              </TabsContent>
            </Tabs>
          </Card>

          <footer className="text-center mt-8 text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </footer>
        </div>
      </section>
    </main>
  )
}

function SignInForm({ goToSignUp }: { goToSignUp: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error, SetError] = useState<String | null>(null)

  const router = useRouter()

  async function onSubmit(h: React.FormEvent<HTMLFormElement>){
    h.preventDefault()
    setLoading(true)
    SetError(null)

    const rollid = (h.currentTarget.elements.namedItem("rollno-signin") as HTMLInputElement).value
    const password = (h.currentTarget.elements.namedItem("password") as HTMLInputElement).value 

    const auth_email = `${rollid}@your-app-domain.com`
    const supabase = createClient()

    const {error : signInError} = await supabase.auth.signInWithPassword({
      email: auth_email,
       password
    });

    if (signInError){
      SetError(signInError.message);
    }
    else {
      console.log("Success")
      router.push('/home')
    }

    setLoading(false)
  }



  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="rollno-signin">Roll No</Label>
          <Input id="rollno-signin" type="text" placeholder="Enter your roll number" required />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4">
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" required />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm text-muted-foreground">
            Remember me
          </Label>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Sign in
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          New here?{" "}
          <button type="button" onClick={goToSignUp} className="font-medium auth-link underline underline-offset-4">
            Create an account
          </button>
        </p>
      </CardFooter>
    </form>
  )
}

function SignUpForm({ goToSignIn }: { goToSignIn: () => void }) {
  const [accepted, setAccepted] = React.useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = React.useState<string | null>(null)


  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value 
    const rollid = (e.currentTarget.elements.namedItem("rollno-signup") as HTMLInputElement).value
    const password = (e.currentTarget.elements.namedItem("password-signup") as HTMLInputElement).value

    const authEmail = `${rollid}@your-app-domain.com`;

    const supabase = createClient()

    const {error: signUpError} = await supabase.auth.signUp({
      email: authEmail, 
      password
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      
      console.log("Signed up successfully!");
      goToSignIn();
    }
  setLoading(false)
  }


  return (
    <form onSubmit={onSubmit} className="space-y-6" id="signup">
      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" type="text" placeholder="Full name" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="rollno-signup">Roll No</Label>
          <Input id="rollno-signup" type="text" placeholder="Enter your roll number" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password-signup">Password</Label>
          <Input id="password-signup" type="password" placeholder="Create a strong password" required />
        </div>

        <div className="flex items-start gap-2">
          <Checkbox id="terms" checked={accepted} onCheckedChange={(v) => setAccepted(Boolean(v))} />
          <Label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree to the{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </Label>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-70"
          disabled={!accepted}
        >
          Create account
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button type="button" onClick={goToSignIn} className="font-medium auth-link underline underline-offset-4">
            Sign in
          </button>
        </p>
      </CardFooter>
    </form>
  )
}
