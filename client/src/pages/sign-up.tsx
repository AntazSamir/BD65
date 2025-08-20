import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, type InsertUser } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, UserPlus } from "lucide-react";

export default function SignUp() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signUp, isSigningUp } = useAuth();

  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
      dateOfBirth: "",
      nationality: "",
    },
  });

  const onSubmit = async (data: InsertUser) => {
    try {
      setError("");
      await signUp(data);
      setLocation("/");
    } catch (error: any) {
      const errorMessage = error && typeof error === 'object' && 'message' in error 
        ? error.message 
        : error?.toString?.() || "Sign up failed";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center section-bg-soft py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl elegant-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Join BD Explorer and start your journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First name"
                  data-testid="input-firstname"
                  {...form.register("firstName")}
                />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  data-testid="input-lastname"
                  {...form.register("lastName")}
                />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                data-testid="input-email"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Choose a username"
                data-testid="input-username"
                {...form.register("username")}
              />
              {form.formState.errors.username && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  data-testid="input-password"
                  {...form.register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  data-testid="button-toggle-password"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  placeholder="Your phone number"
                  data-testid="input-phone"
                  {...form.register("phone")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth (Optional)</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  data-testid="input-dob"
                  {...form.register("dateOfBirth")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality (Optional)</Label>
              <Input
                id="nationality"
                placeholder="Your nationality"
                data-testid="input-nationality"
                {...form.register("nationality")}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSigningUp}
              data-testid="button-signup"
            >
              {isSigningUp ? (
                "Creating account..."
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                data-testid="link-signin"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}