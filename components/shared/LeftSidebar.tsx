"use client"

import { sidebarLinks } from "@/components/constants"
import { SignInButton, SignOutButton, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { motion } from 'framer-motion';

export default function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  // Define animation variants
  const sidebarItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const signButtonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="custom-scrollbar leftsidebar"
      initial={{ opacity: 0 , x:"-100vw"}}
      animate={{ opacity: 1 , x:0}}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
       <div className="flex w-full flex-1 flex-col gap-6 px-6 ">
        <motion.div
          className="flex flex-col gap-6"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          animate="visible"
        >
          {sidebarLinks.map((link) => {
            //to check if a link is active
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            if (link.route === '/profile') link.route = `${link.route}/${userId}`;

            return (
              // return (
                <Link key={link.label} href={link.route} >
                   <motion.div
                    className={`leftsidebar_link cursor-pointer hover:bg-gray-300 duration-200 font-semibold ${
                      isActive && ' bg-gray-700 hover:bg-gray-700 text-white'
                    } `}
                    variants={sidebarItemVariants}
                    >
                <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                <p className=" max-lg:hidden">{link.label}</p>
              </motion.div>
                </Link>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <motion.div
            variants={signButtonVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 5 }}
          >
            <SignOutButton>
              <div className="flex hover:bg-yellow-400 duration-200 bg-yellow-300 rounded-xl cursor-pointer gap-4 p-4">
                <Image width={24} height={24} alt="logout" src="/assets/logout.svg" />
                <p className=" max-lg:hidden">Logout</p>
              </div>
            </SignOutButton>
          </motion.div>
        </SignedIn>

        <SignedOut>
          <motion.div
            variants={signButtonVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <SignInButton>
              <div className="flex hover:bg-yellow-400 bg-yellow-300 rounded-lg cursor-pointer gap-4 p-4">
                <Image width={24} height={24} alt="logout" src="/assets/login.svg" />
                <p className=" max-lg:hidden">Login</p>
              </div>
            </SignInButton>
          </motion.div>
        </SignedOut>
      </div>

    </motion.section>
  );
}
