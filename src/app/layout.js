import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CustomThemeProvider } from "@/hooks/DarkmodeProvider";
import { CartProvider } from "@/context/cartContext";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar-section/Navbar";
import { Divider } from "@mui/material";
import HeaderSection from "@/components/header-section/HeaderSeaction";
import { WishlistProvider } from "@/context/wishlistContext";
import { FloatingParticles } from "@/components/wishlist/WishList";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "ShopPilot - Your Ultimate Shopping Destination",
  description: "Discover amazing products at great prices with ShopPilot. Your one-stop e-commerce destination for electronics, fashion, home goods and more.",
  keywords: "ecommerce, shopping, online store, electronics, fashion, home goods, deals",
  authors: [{ name: "ShopPilot Team" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  openGraph: {
    title: "ShopPilot - Your Ultimate Shopping Destination",
    description: "Discover amazing products at great prices with ShopPilot.",
    url: "https://shop-pilot-xi.vercel.app",
    siteName: "ShopPilot",
    images: [
      {
        url: "https://shop-pilot-xi.vercel.app/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "ShopPilot Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
          <CustomThemeProvider>
            <div className="fixed inset-0 -z-10 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse dark:from-purple-500/10 dark:to-pink-500/10"></div>
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000 dark:from-blue-500/10 dark:to-cyan-500/10"></div>
              <FloatingParticles />
            </div>
            <CartProvider>
              <WishlistProvider>
                <header className="w-full sticky top-0 z-20">
                  <HeaderSection />
                  <Divider className="w-full h-[1px] bg-gray-200/70 dark:bg-gray-700" />
                  <Navbar />
                </header>
                <main>{children}</main>
                <Toaster
                  position="top-right"
                  visibleToasts={3}
                  expand={true}
                  richColors
                  closeButton
                />
              </WishlistProvider>
            </CartProvider>
          </CustomThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
