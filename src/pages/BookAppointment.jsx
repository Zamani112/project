import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { createAppointment } from '../api/appointments';
import { useAuth } from '../hooks/useAuth';

const BookAppointment = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const bookAppointmentMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      toast({
        title: "Appointment Booked",
        description: "Your appointment has been successfully booked.",
      });
      navigate('/appointments');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    bookAppointmentMutation.mutate({
      patient_id: user.id,
      doctor_id: doctorId,
      date,
      time,
      status: 'scheduled'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Book an Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input 
                id="time" 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Select onValueChange={setDoctorId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Dr. Smith</SelectItem>
                  <SelectItem value="2">Dr. Johnson</SelectItem>
                  <SelectItem value="3">Dr. Williams</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">Book Appointment</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookAppointment;