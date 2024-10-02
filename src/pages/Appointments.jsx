import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { fetchAppointments, updateAppointment, deleteAppointment } from '../api/appointments';
import { useAuth } from '../hooks/useAuth';

const Appointments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
    enabled: !!user,
  });

  const updateAppointmentMutation = useMutation({
    mutationFn: ({ id, updateData }) => updateAppointment(id, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      toast({
        title: "Appointment Updated",
        description: "Your appointment has been successfully updated.",
      });
    },
  });

  const deleteAppointmentMutation = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      toast({
        title: "Appointment Cancelled",
        description: "Your appointment has been successfully cancelled.",
      });
    },
  });

  const handleBookNewAppointment = () => {
    navigate('/book-appointment');
  };

  if (!user) {
    return <div>Please sign in to view appointments.</div>;
  }

  if (isLoading) return <div>Loading appointments...</div>;
  if (error) return <div>Error loading appointments: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Appointments</h1>
      <div className="space-y-4">
        {appointments && appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader>
              <CardTitle>{appointment.doctor_id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
              <div className="mt-4 space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Reschedule</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reschedule Appointment</DialogTitle>
                    </DialogHeader>
                    <Calendar
                      mode="single"
                      selected={new Date(appointment.date)}
                      onSelect={(date) => {
                        if (date) {
                          updateAppointmentMutation.mutate({
                            id: appointment.id,
                            updateData: { date: date.toISOString().split('T')[0] },
                          });
                        }
                      }}
                      className="rounded-md border"
                    />
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="outline" 
                  onClick={() => deleteAppointmentMutation.mutate(appointment.id)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="mt-6" onClick={handleBookNewAppointment}>Book New Appointment</Button>
    </div>
  );
};

export default Appointments;