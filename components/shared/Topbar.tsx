import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";


export default function Topbar() {
  return (
    <nav className="topbar " >
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold  max-xs:hidden">
          Hebron <span className="bg-yellow-400 px-3 py-2 tracking-wider rounded-2xl ">HUB</span>
        </p>
      </Link>

      <div className="flex bg-gray-200 p-1 rounded-xl items-center gap-1 ">
        <div className="block md:hidden ">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer ">
                <Image width={24} height={24}  alt="logout" src="/assets/logout.svg" />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher appearance={{
          // baseTheme: light,
          elements: {
              organizationSwitcherTrigger: "py-2 px-4"
          }
        }} />
      </div>
    </nav>
  )
}
