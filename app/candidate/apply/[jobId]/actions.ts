// Server Action for candidate application submission with error handling

"use server";

import { createApplication } from "@/lib/actions/applications";

export async function applyAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const resume_link = formData.get("resume_link") as string;
    const cover_letter = formData.get("cover_letter") as string;
    const jobId = Number(formData.get("jobId"));
    await createApplication({ name, email, resume_link, cover_letter, jobId });
    return { success: true, message: "Application submitted successfully!" };
  } catch (error) {
    console.error("Error submitting application:", error);
    return { success: false, message: "Failed to submit application. Please try again later." };
  } 
}
