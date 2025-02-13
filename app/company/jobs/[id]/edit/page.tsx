// app/company/jobs/[id]/edit/page.tsx

import { getJobById, Job } from "@/lib/actions/jobs";
import EditJobForm from "@/components/EditJobForm";

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id } = await params;
  const jobId = Number(id);
  const job: Job | null = await getJobById(jobId);

  if (!job) {
    return <div>Job not found.</div>;
  }

  // Pass the fetched job data to the client component
  return <EditJobForm job={job} />;
}
