import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./auth/AuthProvider";
import { RequireAuth } from "./auth/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/student"
              element={
                <RequireAuth role="student">
                  <StudentDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/student/*"
              element={
                <RequireAuth role="student">
                  <StudentDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/teacher"
              element={
                <RequireAuth role="teacher">
                  <TeacherDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/teacher/*"
              element={
                <RequireAuth role="teacher">
                  <TeacherDashboard />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
