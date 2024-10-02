import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '../hooks/useAuth';

const API_URL = 'http://localhost:5000/api';

const Complaints = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const { toast } = useToast();

  const submitComplaint = async (data) => {
    const response = await axios.post(`${API_URL}/complaints`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: submitComplaint,
    onSuccess: () => {
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been successfully submitted.",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred while submitting your complaint.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({ ...data, userId: user.id });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">File a Complaint</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" {...register('subject')} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register('description')} required />
            </div>
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? 'Submitting...' : 'Submit Complaint'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Complaints;