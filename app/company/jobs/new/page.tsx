"use client";

// app/company/jobs/new/page.tsx

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createNewJobAction } from "./actions";

export default function NewJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const response = await createNewJobAction(formData); // Call Server Action

    if (response.success) {
      toast({
        title: "Success!",
        description: response.message,
        variant: "default",
      });
      router.refresh();
      router.push("/company/jobs");
    } else {
      toast({
        title: "Error",
        description: response.message,
        variant: "destructive",
      });
    }

    setLoading(false);
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Post a New Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" name="title" placeholder="Job Title" required />
          </div>
          <div>
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Job Description"
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" placeholder="Category" />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" placeholder="Location" />
          </div>
          <div>
            <Label htmlFor="salary_range">Salary Range</Label>
            <Input
              id="salary_range"
              name="salary_range"
              placeholder="Salary Range"
            />
          </div>
          <Button type="submit" disabled={loading}>
            Post Job
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
