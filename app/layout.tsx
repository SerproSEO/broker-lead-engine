import "./globals.css";
import Link from "next/link";
import { getNav } from "@/lib/sanity.queries";

export const metadata = { title: "Broker Lead Engine" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = await getNav();
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-white/10">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-semibold">Broker Lead Engine</Link>
            <ul className="flex gap-6">
              {nav?.map((item: any) => (
                <li key={item._key}>
                  <Link href={item.href} className="hover:opacity-80">{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-12 text-sm text-slate-400">© {new Date().getFullYear()} Broker Lead Engine</footer>
      </body>
    </html>
  );
}