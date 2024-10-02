import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuth } from '../hooks/useAuth';
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { toast } = useToast();

  const onSubmit = async (data) => {
    try {
      // Log the email and password before making the request
      console.log('Attempting to sign in with:', data.email, data.password);

      // Send the login request with email and password
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: data.email,
        password: data.password,
      });

      // Log the response data
      console.log('Sign in response:', response.data);

      if (response.data) {
        // Proceed with the sign-in process
        await signIn(response.data);

        toast({
          title: "Sign in successful",
          description: "Welcome back to OPlus!",
          className: "bg-green-500 text-white",
          duration: 3000,
          position: "top-right",
        });

        // Redirect based on the user role
        switch (response.data.role) {
          case 'patient':
            navigate('/patient-dashboard');
            break;
          case 'doctor':
            navigate('/doctor-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          default:
            navigate('/');
        }
      }
    } catch (error) {
      // Log the error response and message for better debugging
      console.error('Sign in error:', error.response ? error.response.data : error.message);

      toast({
        title: "Sign in failed",
        description: error.response ? error.response.data.message : "An unexpected error occurred",
        variant: "destructive",
        className: "bg-red-500 text-white border-red-700 border-2",
        duration: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-gray-100 dark:bg-gray-800 flex items-center justify-center" 
      style={{backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"}}>
      <div className="w-full max-w-md px-4 py-8">
        <Card className="backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-orange-600 dark:text-orange-400">Sign In to OPlus</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  {...register('email', { required: 'Email is required' })} 
                  className="bg-white/50 dark:bg-gray-800/50" 
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  {...register('password', { required: 'Password is required' })} 
                  className="bg-white/50 dark:bg-gray-800/50" 
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">Sign In</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-white">
              Don't have an account?{' '}
              <Link to="/signup" className="text-orange-400 hover:underline">Sign Up</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
