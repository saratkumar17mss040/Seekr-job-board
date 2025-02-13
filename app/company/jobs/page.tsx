// Company dashboard listing all job posts (with Edit/Delete)

import { getJobs, Job } from "@/lib/actions/jobs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DeleteJobButton from "@/components/DeleteJobButton";

export default async function CompanyJobsPage() {
  
  const jobs: Job[] = await getJobs();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Job Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {jobs.map((job) => (
          <Card key={job.id} className="p-4">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>
                <Link
                href={`/company/${job.id}/applications?title=${encodeURIComponent(job.title)}`}
                  className="text-blue-600 hover:underline"
                >
                  {job.title}
                </Link>
              </CardTitle>
              <div className="space-x-2">
                <Link href={`/company/jobs/${job.id}/edit`}>
                  <button className="text-sm text-green-600 hover:underline">
                    Edit
                  </button>
                </Link>
                <DeleteJobButton jobId={job.id} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                {new Date(job.created_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Link href="/company/jobs/new">
        <button className="mt-6 inline-flex items-center rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
          Post New Job
        </button>
      </Link>
    </div>
  );
}
