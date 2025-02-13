// app/company/[id]/applications/page.tsx

// import { getJobById, Job } from "@/lib/actions/jobs";
import { getApplicationsByJobId } from "@/lib/actions/applications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApplicationsPageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ApplicationsPage({
  params,
  searchParams,
}: ApplicationsPageProps) {
  const jobId = Number(params.id);
  const jobTitle =
    typeof searchParams.title === "string" ? searchParams.title : "Job";

  const applications = await getApplicationsByJobId(jobId);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Applications for: {jobTitle}</h2>
      {applications.length === 0 ? (
        <p>No applications received yet.</p>
      ) : (
        <div className="grid gap-4">
          {applications.map((applicant) => (
            <Card key={applicant.id} className="p-4">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  {applicant.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Email: {applicant.email}
                </p>
                {applicant.resume_link && (
                  <p className="text-sm text-blue-600">
                    Resume:{" "}
                    <a
                      href={applicant.resume_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  </p>
                )}
                {applicant.cover_letter && (
                  <p className="text-sm">{applicant.cover_letter}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
