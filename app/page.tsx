// app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">
        Welcome to the Seekr Job Board
      </h2>
      <p className="mb-6 text-lg">Choose your flow:</p>
      <div className="flex justify-center gap-4">
        <Link href="/candidate/jobs">
          {/* later use shadcn buttons */}
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Candidate Flow
          </button>
        </Link>
        <Link href="/company/jobs">
          <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
            Company Flow
          </button>
        </Link>
      </div>
    </div>
  );
}
