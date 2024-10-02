import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fetchClaims = async () => {
  const response = await axios.get('http://localhost:5000/api/claims', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

const Claims = () => {
  const navigate = useNavigate();
  const { data: claims, isLoading, error } = useQuery({
    queryKey: ['claims'],
    queryFn: fetchClaims,
  });

  const handleFileNewClaim = () => {
    navigate('/file-claim');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading claims: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Claims Management</h1>
      <Button className="mb-4" onClick={handleFileNewClaim}>File New Claim</Button>
      <div className="space-y-4">
        {claims.map((claim) => (
          <Card key={claim.id}>
            <CardHeader>
              <CardTitle>{claim.service}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Date:</strong> {new Date(claim.date).toLocaleDateString()}</p>
              <p><strong>Amount:</strong> ${claim.amount}</p>
              <p><strong>Status:</strong> {claim.status}</p>
              <Button className="mt-2" variant="outline">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Claims;