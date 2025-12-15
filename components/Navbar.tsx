"use client";

import { auth } from "@/lib/auth";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import Image from "next/image";

import { signOut } from "@/lib/actions/auth-actions";
import { ThemeSwitcher } from "./ThemeSwitcher";

type Session = typeof auth.$Infer.Session;

// export const AcmeLogo = () => {
//   return (
//     <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
//       <path
//         clipRule="evenodd"
//         d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
//         fill="currentColor"
//         fillRule="evenodd"
//       />
//     </svg>
//   );
// };

export default function App({ session }: { session: Session | null }) {
  return (
    <Navbar isBordered shouldHideOnScroll maxWidth="xl">
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <Link href="/" className="flex items-center gap-2">
          <p className="font-bold text-2xl bg-linear-to-r from-pink-500 to-yellow-500 dark:from-blue-600 dark:to-purple-600 hover:scale-105 transition bg-clip-text text-transparent">
            BLOG
          </p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          {session ? (
            // <div className="flex items-center gap-3">
            //   <Button
            //     onPress={() => signOut()}
            //     as={Link}
            //     color="primary"
            //     href="/"
            //     variant="flat"
            //   >
            //     Logout
            //   </Button>
            // </div>
            <NavbarWithSession session={session} />
          ) : (
            <div className="flex items-center gap-3">
              <Button
                as={Link}
                color="default"
                href="/auth"
                variant="solid"
                className="bg-linear-to-r from-pink-500 to-yellow-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-3xl shadow hover:scale-105 transition"
              >
                Sign Up / Login
              </Button>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* <NavbarContent as="div" className="items-center" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent> */}
    </Navbar>
  );
}

export function NavbarWithSession({ session }: { session: Session }) {
  return (
    <NavbarContent as="div" className="items-center" justify="end">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name={session.user?.name || "User"}
            size="md"
            src={session.user?.image || ""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{session.user?.name || ""}</p>
          </DropdownItem>
          <DropdownItem key="settings">
            <Link href={`/user/${session.user?.id}`}>My Profile</Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
}
