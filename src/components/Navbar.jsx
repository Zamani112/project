import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-orange-500 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">OPlus</Link>
        <div className="space-x-4 flex items-center">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-orange-100">Dashboard</Link>
              <Link to="/appointments" className="hover:text-orange-100">Appointments</Link>
              <Link to="/messages" className="hover:text-orange-100">Messages</Link>
              <Link to="/claims" className="hover:text-orange-100">Claims</Link>
              <Link to="/video-call" className="hover:text-orange-100">Video Call</Link>
              <Button onClick={signOut} variant="outline" className="text-white hover:bg-orange-600 border-white">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="text-white hover:text-orange-100">
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="text-white hover:bg-orange-600 border-white">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-white hover:text-orange-100"
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;