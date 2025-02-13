"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Ensure the Job interface includes the id field.
interface JobData {
  id: number;
  title: string;
  description: string;
  category?: string;
  location?: string;
  salary_range?: string;
  created_at: string;
}

interface EditJobFormProps {
  job: JobData;
}

export default function EditJobForm({ job }: EditJobFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    // The form submission will send a PUT request to the update API route
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        body: formData,
      });
      
      if (res.ok) {
        router.push("/company/jobs");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating job");
    }
    setSubmitting(false);
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Edit Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" name="title" defaultValue={job.title} required />
          </div>
          <div>
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={job.description}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" defaultValue={job.category} />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" defaultValue={job.location} />
          </div>
          <div>
            <Label htmlFor="salary_range">Salary Range</Label>
            <Input
              id="salary_range"
              name="salary_range"
              defaultValue={job.salary_range}
            />
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Updating..." : "Update Job"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
