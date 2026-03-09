import AppShell from "@/src/components/admin/AppShell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
