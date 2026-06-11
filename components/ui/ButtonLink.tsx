import Link from "next/link";

export function ButtonLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  return (
    <Link className={`btn ${variant}`} href={href}>
      {children}
    </Link>
  );
}
