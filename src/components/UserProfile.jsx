import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from '../hooks/useAuth';

const UserProfile = () => {
  const { user } = useAuth();
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['userProfile', user.id],
    queryFn: () => fetchUserProfile(user.id),
  });

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error loading profile: {error.message}</div>;

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-gray-500">{profile.role}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          {profile.role === 'doctor' && (
            <>
              <p><strong>Specialization:</strong> {profile.specialization}</p>
              <p><strong>License Number:</strong> {profile.licenseNumber}</p>
            </>
          )}
          {profile.role === 'patient' && (
            <>
              <p><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
              <p><strong>Emergency Contact:</strong> {profile.emergencyContact}</p>
            </>
          )}
        </div>
        <Button className="mt-4">Edit Profile</Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;