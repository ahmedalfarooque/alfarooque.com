import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notFound">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The requested Alfarooque Holding page could not be found.</p>
      <Link className="btn primary" href="/en">
        Return home
      </Link>
    </main>
  );
}
