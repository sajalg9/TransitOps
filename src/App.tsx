import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { QueryProvider } from "@/providers/QueryProvider";
import { AppRoutes } from "@/routes/AppRoutes";

export default function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryProvider>
  );
}