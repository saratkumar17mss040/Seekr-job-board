// Server Action for creating a new job post with error handling

"use server";

import { createJob } from "@/lib/actions/jobs";

export async function createNewJobAction(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const location = formData.get("location") as string;
    const salary_range = formData.get("salary_range") as string;
    await createJob({ title, description, category, location, salary_range });
    return { success: true, message: "New job created successfully!" };
  } catch (error) {
    console.error("Error posting new job:", error);
    return {
      success: false,
      message: "Failed to create new job. Please try again later.",
    };
  }
}
