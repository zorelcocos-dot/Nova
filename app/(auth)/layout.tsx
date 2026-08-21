export const metadata = {
  title: "Welcome",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
