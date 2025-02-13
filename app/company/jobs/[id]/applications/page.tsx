// View applications for a specific job post

import { getJobById, Job } from "@/lib/actions/jobs";
import { getApplicationsByJobId } from "@/lib/actions/applications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApplicationsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicationsPage({
  params,
}: ApplicationsPageProps) {
  const { id } = await params;
  const jobId = Number(id);
  const job: Job | null = await getJobById(jobId);
  const applications = await getApplicationsByJobId(jobId);

  if (!job) {
    return <div>Job not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Applications for: {job.title}</h2>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id} className="p-4">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  {app.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">Email: {app.email}</p>
                {app.resume_link && (
                  <p className="text-sm text-blue-600">
                    Resume:{" "}
                    <a href={app.resume_link} target="_blank" rel="noreferrer">
                      View
                    </a>
                  </p>
                )}
                {app.cover_letter && (
                  <p className="text-sm mt-2">{app.cover_letter}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
