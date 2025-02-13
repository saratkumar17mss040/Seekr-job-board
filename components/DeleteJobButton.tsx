"use client";

import { useRouter } from "next/navigation";

interface DeleteJobButtonProps {
  jobId: number;
}

export default function DeleteJobButton({ jobId }: DeleteJobButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this job?")) {
      const res = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      if (res.ok) {
        // Refresh the data without reloading the entire page
        router.refresh();
      } else {
        alert("Failed to delete");
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-sm text-red-600 hover:underline"
    >
      Delete
    </button>
  );
}
