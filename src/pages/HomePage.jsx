import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-gray-100 dark:bg-gray-800" style={{backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"}}>
      <div className="container mx-auto px-4 py-8 bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80">
        <h1 className="text-4xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400">Welcome to OPlus Telemedicine</h1>
        <p className="text-xl mb-8 text-center text-gray-800 dark:text-gray-200">Connect with doctors, manage appointments, and take control of your health from the comfort of your home.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-orange-200 dark:border-orange-700 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-orange-600 dark:text-orange-400">24/7 Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="dark:text-gray-300">Get medical advice anytime, anywhere. Our platform is always available for your health needs.</p>
            </CardContent>
          </Card>
          <Card className="border-orange-200 dark:border-orange-700 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-orange-600 dark:text-orange-400">Expert Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="dark:text-gray-300">Connect with qualified and experienced doctors across various specialties.</p>
            </CardContent>
          </Card>
          <Card className="border-orange-200 dark:border-orange-700 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-orange-600 dark:text-orange-400">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="dark:text-gray-300">Your health information is protected with state-of-the-art security measures.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;