import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

// Load Google Fonts dynamically for Next.js optimization
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "SAVAXA — Cinematic Digital Agriculture & Sustainable Crop Protection",
  description:
    "Explore the future of agriculture with SAVAXA. Experience award-winning cinematic storytelling, smart 3D crop protection telemetry, and eco-friendly target biochemical solutions.",
  keywords: [
    "SAVAXA",
    "Digital Agriculture",
    "Sustainable Crop Protection",
    "Smart Farming",
    "Agri-Tech",
    "Bio-friendly Insecticides",
    "Precision Herbicides",
    "Crop Nutrition",
  ],
  authors: [{ name: "SAVAXA Agro-Sciences Ltd" }],
  openGraph: {
    title: "SAVAXA — Cinematic Digital Agriculture & Sustainable Crop Protection",
    description:
      "A living digital ecosystem where nature, technology, and sustainability blend through immersive 3D telemetry and high-precision biochemistry.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
