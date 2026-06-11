import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.alfarooque.com"),
  title: {
    default: "Alfarooque Holding",
    template: "%s | Alfarooque Holding"
  },
  description:
    "A premium Saudi holding company platform spanning wooden industries, paint technology, grooming, automotive accessories, projects, and enterprise services.",
  openGraph: {
    title: "Alfarooque Holding",
    description:
      "A premium Saudi holding company platform spanning manufacturing, retail, lifestyle, and automotive businesses.",
    images: ["/images/wood-office.webp"],
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
