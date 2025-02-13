// Handles candidate application submission (POST)

// app/api/apply/route.ts
import { NextResponse } from "next/server";
import { createApplication } from "@/lib/actions/applications";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const resume_link = formData.get("resume_link") as string;
  const cover_letter = formData.get("cover_letter") as string;
  const jobId = Number(formData.get("jobId"));

  try {
    const application = await createApplication({
      name,
      email,
      resume_link,
      cover_letter,
      jobId,
    });
    return NextResponse.json({ success: true, application });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
