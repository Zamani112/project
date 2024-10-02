import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { fetchMedicalRecords, addMedicalRecord } from '../api/medicalRecords';
import { useAuth } from '../hooks/useAuth';

const MedicalRecords = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: records, isLoading, error } = useQuery({
    queryKey: ['medicalRecords', user.id],
    queryFn: () => fetchMedicalRecords(user.id),
  });

  const addRecordMutation = useMutation({
    mutationFn: addMedicalRecord,
    onSuccess: () => {
      queryClient.invalidateQueries(['medicalRecords', user.id]);
      toast({
        title: "Record Added",
        description: "Your medical record has been successfully added.",
      });
    },
  });

  if (isLoading) return <div>Loading medical records...</div>;
  if (error) return <div>Error loading medical records: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Medical Records</h1>
      <div className="space-y-4">
        {records.map((record) => (
          <Card key={record.id}>
            <CardHeader>
              <CardTitle>{record.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
              <p><strong>Doctor:</strong> {record.doctorName}</p>
              <p><strong>Description:</strong> {record.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-6">Add New Record</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Medical Record</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            addRecordMutation.mutate({
              userId: user.id,
              title: formData.get('title'),
              date: formData.get('date'),
              doctorName: formData.get('doctorName'),
              description: formData.get('description'),
            });
          }}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" required />
              </div>
              <div>
                <Label htmlFor="doctorName">Doctor Name</Label>
                <Input id="doctorName" name="doctorName" required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required />
              </div>
              <Button type="submit">Add Record</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MedicalRecords;