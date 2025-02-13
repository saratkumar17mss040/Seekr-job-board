// Candidate layout (header/footer with shadcn/ui components)

// app/candidate/layout.tsx

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
