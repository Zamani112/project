import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { fetchPrescriptions, addPrescription } from '../api/prescriptions';
import { useAuth } from '../hooks/useAuth';

const Prescriptions = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: prescriptions, isLoading, error } = useQuery({
    queryKey: ['prescriptions', user.id],
    queryFn: () => fetchPrescriptions(user.id),
  });

  const addPrescriptionMutation = useMutation({
    mutationFn: addPrescription,
    onSuccess: () => {
      queryClient.invalidateQueries(['prescriptions', user.id]);
      toast({
        title: "Prescription Added",
        description: "The prescription has been successfully added.",
      });
    },
  });

  if (isLoading) return <div>Loading prescriptions...</div>;
  if (error) return <div>Error loading prescriptions: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Prescriptions</h1>
      <div className="space-y-4">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id}>
            <CardHeader>
              <CardTitle>{prescription.medication}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Date:</strong> {new Date(prescription.date).toLocaleDateString()}</p>
              <p><strong>Doctor:</strong> {prescription.doctorName}</p>
              <p><strong>Dosage:</strong> {prescription.dosage}</p>
              <p><strong>Instructions:</strong> {prescription.instructions}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {user.role === 'doctor' && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-6">Add New Prescription</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Prescription</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              addPrescriptionMutation.mutate({
                patientId: user.id, // This should be the patient's ID in a real scenario
                medication: formData.get('medication'),
                dosage: formData.get('dosage'),
                instructions: formData.get('instructions'),
                date: new Date().toISOString(),
                doctorName: user.name,
              });
            }}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="medication">Medication</Label>
                  <Input id="medication" name="medication" required />
                </div>
                <div>
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input id="dosage" name="dosage" required />
                </div>
                <div>
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea id="instructions" name="instructions" required />
                </div>
                <Button type="submit">Add Prescription</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Prescriptions;