import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollManager from "../components/ScrollManager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Housing Matra",
  description: "Find your next home with our carefully selected premium apartments in Germany.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${roboto.variable} font-sans bg-page text-body antialiased min-h-screen flex flex-col`}>
        <ScrollManager />
        <Header />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
