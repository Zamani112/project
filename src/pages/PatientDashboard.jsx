import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

const PatientDashboard = () => {
  const { user } = useAuth();

  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: () => axios.get(`/api/users/${user.id}`).then(res => res.data),
    enabled: !!user,
  });

  const { data: claims } = useQuery({
    queryKey: ['claims'],
    queryFn: () => axios.get('/api/claims').then(res => res.data),
    enabled: !!user,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {userData?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/appointments">Manage Appointments</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/messages">View Messages</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Video Call</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/video-call">Start Video Call</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full mb-2">
              <Link to="/claims">Manage Claims</Link>
            </Button>
            <Button asChild className="w-full">
              <Link to="/file-claim">File New Claim</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Claims</CardTitle>
          </CardHeader>
          <CardContent>
            {claims && claims.length > 0 ? (
              <ul>
                {claims.slice(0, 3).map((claim) => (
                  <li key={claim.id} className="mb-2">
                    {claim.service} - ${claim.amount} ({claim.status})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent claims</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;