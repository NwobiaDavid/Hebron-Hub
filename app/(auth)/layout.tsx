
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

import '../globals.css'

export const metadata = {
    title: 'threads',
    description: 'a next js app'
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {

  
    return (
      <ClerkProvider>
        <html lang="en">
          <body className={`${inter.className} bg-white`}>
            <div
              className="w-full flex justify-center flex-col items-center min-h-screen"
            >
              <div
                className="mb-10"
              >
                <h2 className="text-heading1-semibold">
                  Welcome to Hebron
                  <span className="rounded-xl bg-yellow-400 tracking-wider p-2">HUB</span>
                </h2>
              </div>
              {children}
            </div>
          </body>
        </html>
      </ClerkProvider>
    );
  }