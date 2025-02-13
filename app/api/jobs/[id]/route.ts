// Handles job update (PUT) and deletion (DELETE) through JobId

// app/api/jobs/[id]/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const jobId = Number(id);
  try {
    await pool.query("DELETE FROM jobs WHERE id = $1", [jobId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  console.log(id);
  
  const jobId = Number(id);
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  const salary_range = formData.get("salary_range") as string;
  try {
    const res = await pool.query(
      `UPDATE jobs SET title = $1, description = $2, category = $3, location = $4, salary_range = $5 WHERE id = $6 RETURNING *`,
      [
        title,
        description,
        category || null,
        location || null,
        salary_range || null,
        jobId,
      ]
    );
    return NextResponse.json({ success: true, job: res.rows[0] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
