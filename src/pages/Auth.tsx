import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Briefcase, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { z } from "zod";
import PlayerSignupFields from "@/components/auth/PlayerSignupFields";
import AgentSignupFields from "@/components/auth/AgentSignupFields";

const emailSchema = z.string().trim().email({ message: "Invalid email address" }).max(255);
const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters" }).max(72);
const nameSchema = z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100);

type AuthMode = "login" | "signup";
type RoleType = "agent" | "player";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [role, setRole] = useState<RoleType | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Player-specific fields
  const [position, setPosition] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [preferredFoot, setPreferredFoot] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [playerCountry, setPlayerCountry] = useState("");

  // Agent-specific fields
  const [agentCountry, setAgentCountry] = useState("");
  const [agentCity, setAgentCity] = useState("");
  const [agentBio, setAgentBio] = useState("");

  const { signIn, signUp, user, role: userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user && userRole) {
      navigate(userRole === "agent" ? "/agent/dashboard" : "/player/dashboard");
    }
  }, [user, userRole, navigate]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    if (mode === "signup") {
      const nameResult = nameSchema.safeParse(fullName);
      if (!nameResult.success) {
        newErrors.fullName = nameResult.error.errors[0].message;
      }
      if (!role) {
        newErrors.role = "Please select a role";
      }

      if (role === "player") {
        if (!position) newErrors.position = "Please select a position";
        if (!dateOfBirth) newErrors.dateOfBirth = "Please enter your date of birth";
        if (height && (isNaN(Number(height)) || Number(height) < 100 || Number(height) > 250)) {
          newErrors.height = "Enter a valid height (100-250 cm)";
        }
        if (weight && (isNaN(Number(weight)) || Number(weight) < 30 || Number(weight) > 200)) {
          newErrors.weight = "Enter a valid weight (30-200 kg)";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildProfileData = (): Record<string, string> => {
    if (role === "player") {
      const data: Record<string, string> = {};
      if (position) data.position = position;
      if (height) data.height = `${height}cm`;
      if (weight) data.weight = `${weight}kg`;
      if (preferredFoot) data.preferred_foot = preferredFoot;
      if (dateOfBirth) data.date_of_birth = dateOfBirth;
      if (playerCountry) data.country = playerCountry;
      return data;
    }

    if (role === "agent") {
      const data: Record<string, string> = {};
      if (agentCountry) data.country = agentCountry;
      if (agentCity) data.city = agentCity;
      if (agentBio) data.bio = agentBio;
      return data;
    }

    return {};
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (mode === "login") {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({ title: "Invalid credentials", description: "Please check your email and password.", variant: "destructive" });
          } else if (error.message.includes("Email not confirmed")) {
            toast({ title: "Email not verified", description: "Please check your email for the verification link.", variant: "destructive" });
          } else {
            toast({ title: "Login failed", description: error.message, variant: "destructive" });
          }
        }
      } else {
        const profileData = buildProfileData();
        const { error } = await signUp(email, password, role!, fullName, profileData);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({ title: "Account exists", description: "This email is already registered. Try logging in.", variant: "destructive" });
          } else {
            toast({ title: "Signup failed", description: error.message, variant: "destructive" });
          }
        } else {
          toast({ title: "Check your email", description: "We sent you a verification link to confirm your account." });
          setMode("login");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24 overflow-y-auto py-8">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-muted-foreground">
              {mode === "login"
                ? "Sign in to continue to your dashboard"
                : "Join the platform connecting African football talent"}
            </p>
          </div>

          {/* Role Selection for Signup */}
          {mode === "signup" && (
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">I am a...</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole("player")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === "player"
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <User className={`w-8 h-8 mx-auto mb-2 ${role === "player" ? "text-emerald-500" : "text-muted-foreground"}`} />
                  <p className={`font-medium ${role === "player" ? "text-emerald-500" : "text-foreground"}`}>Player</p>
                  <p className="text-xs text-muted-foreground mt-1">Showcase my talent</p>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("agent")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === "agent"
                      ? "border-amber-500 bg-amber-500/10"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <Briefcase className={`w-8 h-8 mx-auto mb-2 ${role === "agent" ? "text-amber-500" : "text-muted-foreground"}`} />
                  <p className={`font-medium ${role === "agent" ? "text-amber-500" : "text-foreground"}`}>Agent</p>
                  <p className="text-xs text-muted-foreground mt-1">Discover talent</p>
                </button>
              </div>
              {errors.role && <p className="text-destructive text-sm mt-2">{errors.role}</p>}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1.5"
                />
                {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
              </div>
            )}

            {/* Role-specific fields */}
            {mode === "signup" && role === "player" && (
              <PlayerSignupFields
                position={position}
                setPosition={setPosition}
                height={height}
                setHeight={setHeight}
                weight={weight}
                setWeight={setWeight}
                preferredFoot={preferredFoot}
                setPreferredFoot={setPreferredFoot}
                dateOfBirth={dateOfBirth}
                setDateOfBirth={setDateOfBirth}
                country={playerCountry}
                setCountry={setPlayerCountry}
                errors={errors}
              />
            )}

            {mode === "signup" && role === "agent" && (
              <AgentSignupFields
                country={agentCountry}
                setCountry={setAgentCountry}
                city={agentCity}
                setCity={setAgentCity}
                bio={agentBio}
                setBio={setAgentBio}
                errors={errors}
              />
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5"
              />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            >
              {isLoading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button onClick={() => setMode("signup")} className="text-emerald-500 hover:underline font-medium">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="text-emerald-500 hover:underline font-medium">
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(245,158,11,0.1),transparent_50%)]" />
        <div className="relative text-center">
          <div className="font-display text-5xl font-black text-white mb-4">BLOOMFIELD</div>
          <p className="text-xl text-white/60 max-w-md">
            The premier platform connecting African football talent with global opportunities
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
