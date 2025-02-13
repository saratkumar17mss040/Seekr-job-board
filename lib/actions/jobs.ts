// Database actions for jobs (including filtering/search)

// lib/actions/jobs.ts
import pool from "../db";

export interface Job {
  id: number;
  title: string;
  description: string;
  category?: string;
  location?: string;
  salary_range?: string;
  created_at: string;
}

// Get jobs with optional filters (category, location, salary_range, search)
export async function getJobs(filters?: {
  category?: string;
  location?: string;
  salary_range?: string;
  search?: string;
}): Promise<Job[]> {
  let query = "SELECT * FROM jobs";
  const conditions = [];
  const values: any[] = [];

  if (filters) {
    if (filters.category) {
      values.push(filters.category);
      conditions.push(`category ILIKE $${values.length}`);
    }
    if (filters.location) {
      values.push(filters.location);
      conditions.push(`location ILIKE $${values.length}`);
    }
    if (filters.salary_range) {
      values.push(filters.salary_range);
      conditions.push(`salary_range ILIKE $${values.length}`);
    }
    if (filters.search) {
      values.push(`%${filters.search}%`);
      conditions.push(
        `(title ILIKE $${values.length} OR description ILIKE $${values.length})`
      );
    }
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  query += " ORDER BY created_at DESC";

  const res = await pool.query(query, values);
  console.log(res.rows);
  return res.rows;
}

export async function getJobById(id: number): Promise<Job | null> {
  const res = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
  return res.rows[0] || null;
}

export async function createJob(data: {
  title: string;
  description: string;
  category?: string;
  location?: string;
  salary_range?: string;
}): Promise<Job> {
  const res = await pool.query(
    `INSERT INTO jobs (title, description, category, location, salary_range)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      data.title,
      data.description,
      data.category || null,
      data.location || null,
      data.salary_range || null,
    ]
  );
  return res.rows[0];
}
