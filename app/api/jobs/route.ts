// Handles new job creation (POST)

// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import { createJob } from "@/lib/actions/jobs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  const salary_range = formData.get("salary_range") as string;

  try {
    const job = await createJob({ title, description, category, location, salary_range });
    return NextResponse.json({ success: true, job });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
