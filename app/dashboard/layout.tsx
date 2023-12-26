import SideNav from "@/components/SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <SideNav />
      </div>
    </div>
  );
}
