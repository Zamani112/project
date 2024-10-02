import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Messages from "./pages/Messages";
import VideoCall from "./pages/VideoCall";
import Appointments from "./pages/Appointments";
import Complaints from "./pages/Complaints";
import Claims from "./pages/Claims";
import BookAppointment from "./pages/BookAppointment";
import FileClaim from "./pages/FileClaim";
import UserProfile from "./components/UserProfile";
import MedicalRecords from "./pages/MedicalRecords";
import Prescriptions from "./pages/Prescriptions";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <AuthProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/dashboard" element={<PatientDashboard />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/video-call" element={<VideoCall />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/complaints" element={<Complaints />} />
                <Route path="/claims" element={<Claims />} />
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="/file-claim" element={<FileClaim />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/medical-records" element={<MedicalRecords />} />
                <Route path="/prescriptions" element={<Prescriptions />} />
              </Routes>
              <Toaster />
            </div>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;