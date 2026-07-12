// src/pages/auth/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Truck } from "lucide-react";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) setError(error);
    else navigate("/dashboard");
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/3 bg-secondary flex-col justify-between p-10">
        <div className="flex items-center gap-2">
          <Truck className="text-primary" />
          <div>
            <h1 className="font-bold text-lg">TransitOps</h1>
            <p className="text-xs text-muted-foreground">Smart Transport Operations Platform</p>
          </div>
        </div>
        <div>
          <p className="font-medium mb-2">One login, four roles:</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Fleet Manager</li>
            <li>Dispatcher</li>
            <li>Safety Officer</li>
            <li>Financial Analyst</li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground">TransitOps © 2026 · RBAC 0.4.0</p>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Sign in to your account</h2>
            <p className="text-sm text-muted-foreground">Enter your credentials to continue</p>
          </div>
          {error && (
            <div className="text-sm text-destructive border border-destructive/30 bg-destructive/10 rounded-md p-2">
              {error}
            </div>
          )}
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="fleet@transitops.io"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-primary text-primary-foreground rounded-md py-2 font-medium hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}