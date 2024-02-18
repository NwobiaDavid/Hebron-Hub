
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
    // const [isLoaded, setIsLoaded] = useState(false);

    // useEffect(() => {
    //   setIsLoaded(true);
    // }, []);

    // setTimeout(() => {
    //     const element = document.querySelector('.mb-10');
    //     if (element) {
    //         element.classList.add('loaded');
    //     }
    // }, 2000); 
  
    return (
      <ClerkProvider>
        <html lang="en">
          <body className={`${inter.className} bg-white`}>
            <div
              className="w-full flex justify-center flex-col items-center min-h-screen"
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              // transition={{ duration: 0.5 , delay: 2}}
            >
              <div
                className="mb-10"
                // initial={{y:"200vh", opacity: 0 }}
                // animate={{
                //   y: 0 ,
                //   opacity: 1
                // }}
                // transition={{ duration: 0.5 , ease:"easeIn", delay: 2 }}
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