import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuthActions();
  const updateUserProfile = useMutation(api.users.updateUserProfile);

  const [mode, setMode] = useState<"login" | "signup" | "forgot-email" | "forgot-verify">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Signup form
  const [signupData, setSignupData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    passwordHint: "",
  });

  // Login form
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Forgot password form
  const [forgotData, setForgotData] = useState({
    email: "",
    hint: "",
    hintAnswer: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const redirectAfterAuth =
    new URLSearchParams(location.search).get("redirectTo") || "/";

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validation
      if (signupData.password !== signupData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (signupData.password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      if (!signupData.username || !signupData.email || !signupData.name || !signupData.phone || !signupData.passwordHint) {
        throw new Error("All fields are required");
      }

      // Create account with Convex Auth Password provider
      const formData = new FormData();
      formData.append("email", signupData.email);
      formData.append("password", signupData.password);
      formData.append("flow", "signUp");

      await signIn("password", formData);

      // Update profile with additional info
      await updateUserProfile({
        name: signupData.name,
        username: signupData.username,
        phone: signupData.phone,
        passwordHint: signupData.passwordHint,
      });

      toast.success("Account created successfully!");
      navigate(redirectAfterAuth);
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "Failed to create account");
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("email", loginData.email);
      formData.append("password", loginData.password);
      formData.append("flow", "signIn");

      await signIn("password", formData);

      toast.success("Logged in successfully!");
      navigate(redirectAfterAuth);
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Invalid email or password");
      setIsLoading(false);
    }
  };

  const requestPasswordResetQuery = useQuery(
    api.passwordReset.requestPasswordReset,
    mode === "forgot-verify" && forgotData.email ? { email: forgotData.email } : "skip"
  );

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!forgotData.email) {
        throw new Error("Please enter your email");
      }

      // Just move to next step, query will load the hint
      setMode("forgot-verify");
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to request reset");
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Verify hint answer
      if (!requestPasswordResetQuery) {
        throw new Error("Loading hint information...");
      }

      if (requestPasswordResetQuery.hint.toLowerCase() !== forgotData.hintAnswer.toLowerCase()) {
        throw new Error("Incorrect password hint answer");
      }

      if (forgotData.newPassword !== forgotData.confirmNewPassword) {
        throw new Error("Passwords do not match");
      }

      if (forgotData.newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      // Reset password by creating new credentials
      const formData = new FormData();
      formData.append("email", forgotData.email);
      formData.append("password", forgotData.newPassword);
      formData.append("flow", "signUp");

      await signIn("password", formData);

      toast.success("Password reset successfully!");
      setMode("login");
      setForgotData({ email: "", hint: "", hintAnswer: "", newPassword: "", confirmNewPassword: "" });
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <Card className="glass-strong w-full max-w-md p-6 md:p-8">
        <CardHeader className="text-center pb-6">
          <img
            src="https://harmless-tapir-303.convex.cloud/api/storage/779a82d1-7f12-47d3-8366-6de246739ec6"
            alt="Nirvana Tech"
            className="h-16 w-auto mx-auto mb-4 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <CardTitle className="text-2xl md:text-3xl font-black uppercase">
            {mode === "login" && "Login"}
            {mode === "signup" && "Create Account"}
            {(mode === "forgot-email" || mode === "forgot-verify") && "Reset Password"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {mode === "signup" && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  value={signupData.username}
                  onChange={(e) =>
                    setSignupData({ ...signupData, username: e.target.value })
                  }
                  className="glass"
                  required
                />
              </div>

              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={signupData.name}
                  onChange={(e) =>
                    setSignupData({ ...signupData, name: e.target.value })
                  }
                  className="glass"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  className="glass"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={signupData.phone}
                  onChange={(e) =>
                    setSignupData({ ...signupData, phone: e.target.value })
                  }
                  className="glass"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    className="glass pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Must be at least 8 characters
                </p>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="glass pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="passwordHint">
                  Password Hint * (for recovery)
                </Label>
                <Input
                  id="passwordHint"
                  value={signupData.passwordHint}
                  onChange={(e) =>
                    setSignupData({ ...signupData, passwordHint: e.target.value })
                  }
                  className="glass"
                  placeholder="e.g., My first pet's name"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Remember this - you'll need it if you forget your password
                </p>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-black border-3 md:border-4 border-black font-black uppercase shadow-[3px_3px_0_0_#000] md:shadow-[4px_4px_0_0_#000]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError(null);
                  }}
                  className="text-primary hover:underline font-bold"
                >
                  Login
                </button>
              </div>
            </form>
          )}

          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="loginEmail">Email *</Label>
                <Input
                  id="loginEmail"
                  type="email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  className="glass"
                  required
                />
              </div>

              <div>
                <Label htmlFor="loginPassword">Password *</Label>
                <div className="relative">
                  <Input
                    id="loginPassword"
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    className="glass pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-black border-3 md:border-4 border-black font-black uppercase shadow-[3px_3px_0_0_#000] md:shadow-[4px_4px_0_0_#000]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="flex justify-between text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setMode("forgot-email");
                    setError(null);
                  }}
                  className="text-primary hover:underline"
                >
                  Forgot Password?
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError(null);
                  }}
                  className="text-primary hover:underline font-bold"
                >
                  Create Account
                </button>
              </div>
            </form>
          )}

          {mode === "forgot-email" && (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div>
                <Label htmlFor="forgotEmail">Email Address *</Label>
                <Input
                  id="forgotEmail"
                  type="email"
                  value={forgotData.email}
                  onChange={(e) =>
                    setForgotData({ ...forgotData, email: e.target.value })
                  }
                  className="glass"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  We'll show you your password hint
                </p>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-black border-3 md:border-4 border-black font-black uppercase shadow-[3px_3px_0_0_#000] md:shadow-[4px_4px_0_0_#000]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError(null);
                  }}
                  className="text-primary hover:underline"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}

          {mode === "forgot-verify" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {requestPasswordResetQuery && (
                <div className="p-3 bg-primary/10 rounded border-3 border-primary/30">
                  <p className="text-sm font-semibold mb-1">Your Password Hint:</p>
                  <p className="text-sm font-bold">{requestPasswordResetQuery.hint}</p>
                </div>
              )}

              <div>
                <Label htmlFor="hintAnswer">Your Answer *</Label>
                <Input
                  id="hintAnswer"
                  value={forgotData.hintAnswer}
                  onChange={(e) =>
                    setForgotData({ ...forgotData, hintAnswer: e.target.value })
                  }
                  className="glass"
                  placeholder="Enter the answer to your password hint"
                  required
                />
              </div>

              <div>
                <Label htmlFor="newPassword">New Password *</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={forgotData.newPassword}
                    onChange={(e) =>
                      setForgotData({ ...forgotData, newPassword: e.target.value })
                    }
                    className="glass pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Must be at least 8 characters
                </p>
              </div>

              <div>
                <Label htmlFor="confirmNewPassword">Confirm New Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmNewPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={forgotData.confirmNewPassword}
                    onChange={(e) =>
                      setForgotData({
                        ...forgotData,
                        confirmNewPassword: e.target.value,
                      })
                    }
                    className="glass pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-black border-3 md:border-4 border-black font-black uppercase shadow-[3px_3px_0_0_#000] md:shadow-[4px_4px_0_0_#000]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    Reset Password
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError(null);
                    setForgotData({ email: "", hint: "", hintAnswer: "", newPassword: "", confirmNewPassword: "" });
                  }}
                  className="text-primary hover:underline"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
