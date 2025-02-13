"use client";

// app/candidate/apply/[jobId]/page.tsx

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { applyAction } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApplyPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ApplyPage() {

  const router = useRouter();
  const { toast } = useToast();
  const { jobId } = useParams();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "Unknown Job"; // Extract title

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const response = await applyAction(formData); // Call Server Action

    if (response.success) {
      toast({
        title: "Success!",
        description: response.message,
        variant: "default",
      });
      setTimeout(() => router.push("/candidate/jobs"), 1500); // Redirect after delay
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
        <CardTitle className="text-2xl font-bold">
          Apply for Job, {title} - #{jobId}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your Name" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <Label htmlFor="resume_link">Resume Link</Label>
            <Input
              id="resume_link"
              name="resume_link"
              placeholder="Link to your resume"
            />
          </div>
          <div>
            <Label htmlFor="cover_letter">Cover Letter</Label>
            <Textarea
              id="cover_letter"
              name="cover_letter"
              placeholder="Your cover letter"
            />
          </div>
          <input type="hidden" name="jobId" value={jobId} />
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
