// Job Details page by JobID

// app/candidate/jobs/[id]/page.tsx
import { getJobById, Job } from "@/lib/actions/jobs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const jobId = Number(id);
  const job: Job | null = await getJobById(jobId);

  if (!job) {
    return <div>Job not found.</div>;
  }

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{job.description}</p>
        <div className="text-sm text-gray-600">
          <p>Category: {job.category || "N/A"}</p>
          <p>Location: {job.location || "N/A"}</p>
          <p>Salary Range: {job.salary_range || "N/A"}</p>
        </div>
        <Link
          href={`/candidate/apply/${job.id}?title=${encodeURIComponent(
            job.title
          )}`}
        >
          <button className="mt-4 inline-flex items-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Apply Now
          </button>
        </Link>
      </CardContent>
    </Card>
  );
}
