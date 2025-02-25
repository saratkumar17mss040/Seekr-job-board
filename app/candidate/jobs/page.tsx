// "use client";
// Job Listings page with filtering & search

// app/candidate/jobs/page.tsx
import { getJobs, Job } from "@/lib/actions/jobs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import JobFilterForm from "@/components/JobFilterForm";

interface JobsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const { category, location, salary_range, search } = await searchParams;

  const filters = {
    category,
    location,
    salary_range,
    search,
  };
  const jobs: Job[] = await getJobs(filters);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-xl font-semibold mb-4">Available Jobs</h2>
      {/* Filter and Search Form */}
      {/* onFilterChange={handleFilter} */}
      <JobFilterForm initialFilters={filters} />
      {jobs.length === 0 ? (
        <div className="mt-4">No job found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {jobs.map((job) => (
            <Card key={job.id} className="p-4 shadow-md rounded-lg">
              <CardHeader>
                <CardTitle>
                  <Link
                    href={`/candidate/jobs/${job.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {job.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {job.description.slice(0, 100)}...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
