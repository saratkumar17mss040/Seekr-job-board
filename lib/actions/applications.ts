// Database actions for candidate applications

// lib/actions/applications.ts
import pool from "../db";

export interface Application {
  id: number;
  name: string;
  email: string;
  resume_link?: string;
  cover_letter?: string;
  job_id: number;
  created_at: string;
}

export async function createApplication(data: {
  name: string;
  email: string;
  resume_link?: string;
  cover_letter?: string;
  jobId: number;
}): Promise<Application> {
  const res = await pool.query(
    `INSERT INTO applications (name, email, resume_link, cover_letter, job_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      data.name,
      data.email,
      data.resume_link || null,
      data.cover_letter || null,
      data.jobId,
    ]
  );
  return res.rows[0];
}

export async function getApplicationsByJobId(
  jobId: number
): Promise<Application[]> {
  const res = await pool.query(
    "SELECT * FROM applications WHERE job_id = $1 ORDER BY created_at DESC",
    [jobId]
  );
  return res.rows;
}
