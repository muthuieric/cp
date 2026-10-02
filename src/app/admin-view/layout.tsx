import SessionTimeout from "@/components/SessionTimeout";

export default function AdminViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionTimeout />
      {children}
    </>
  );
}
