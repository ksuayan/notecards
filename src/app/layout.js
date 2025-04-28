import { IBM_Plex_Serif, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ibmPlexSerif = IBM_Plex_Serif({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-ibm-plex-serif",
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: 'swap',
});

export const metadata = {
  title: "NoteCards",
  description: "Markdown on NextJS Demo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cn("light", ibmPlexSerif.variable, ibmPlexMono.variable)}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          ibmPlexSerif.variable,
          ibmPlexMono.variable
        )}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl hover:opacity-90">
            NoteCards
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/notecards/about">About</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NoteCards. All rights reserved.
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/privacy">Privacy</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/terms">Terms</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
