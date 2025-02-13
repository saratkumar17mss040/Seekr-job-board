// Company layout (header/footer with shadcn/ui components)

// app/company/layout.tsx

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
