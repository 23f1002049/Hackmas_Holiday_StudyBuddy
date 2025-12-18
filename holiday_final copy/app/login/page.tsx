"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { signIn, signUp } from "@/lib/auth"
import { Github, Snowflake } from "lucide-react"
import { Snowfall } from "@/components/snowfall"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupName, setSignupName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { setAuthState } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await signIn(loginEmail, loginPassword)

    if (result.success && result.user) {
      setAuthState({
        user: result.user,
        isAuthenticated: true,
        isGuest: false,
        token: result.token || null,
      })
      router.push("/")
    } else {
      setError(result.error || "Login failed")
    }

    setLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (signupPassword.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    const result = await signUp(signupEmail, signupPassword, signupName)

    if (result.success && result.user) {
      setAuthState({
        user: result.user,
        isAuthenticated: true,
        isGuest: false,
        token: result.token || null,
      })
      router.push("/")
    } else {
      setError(result.error || "Signup failed")
    }

    setLoading(false)
  }

  const handleGuestMode = () => {
    router.push("/?guest=true")
  }

  const handleGithubAuth = () => {
    setError("GitHub OAuth requires backend setup. Please use email/password or Guest Mode.")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <Snowfall enabled={true} />

      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Snowflake className="h-96 w-96 text-accent animate-spin-slow" />
      </div>

      <Card className="w-full max-w-md relative z-10 bg-card/95 backdrop-blur-sm border-accent/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo.png"
              alt="Holiday Study Buddy"
              width={120}
              height={120}
              className="rounded-full animate-float"
            />
          </div>
          <CardTitle className="text-3xl font-bold text-yellow-300">Holiday Study Buddy</CardTitle>
          <CardDescription className="text-cream">Your festive productivity companion</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-cream">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="bg-card/50 border-accent/30 text-cream placeholder:text-cream/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-cream">
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="bg-card/50 border-accent/30 text-cream placeholder:text-cream/50"
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-md border border-red-400/30">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-cream">
                    Name
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Your Name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                    className="bg-card/50 border-accent/30 text-cream placeholder:text-cream/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-cream">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className="bg-card/50 border-accent/30 text-cream placeholder:text-cream/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-cream">
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    className="bg-card/50 border-accent/30 text-cream placeholder:text-cream/50"
                  />
                  <p className="text-xs text-cream/60">Must be at least 6 characters</p>
                </div>

                {error && (
                  <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-md border border-red-400/30">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-accent/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-cream/60">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-accent/30 hover:bg-accent/10 text-cream bg-transparent"
              onClick={handleGithubAuth}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full border-accent/50 hover:bg-accent/20 text-yellow-300 font-semibold bg-transparent"
              onClick={handleGuestMode}
            >
              Continue as Guest
            </Button>

            <p className="text-xs text-center text-cream/60 mt-2">Guest mode: Progress will not be saved</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
