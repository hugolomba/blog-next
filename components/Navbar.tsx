"use client";

import { auth } from "@/lib/auth";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";

import { signOut } from "@/lib/actions/auth-actions";
import { ThemeSwitcher } from "./ThemeSwitcher";

type Session = typeof auth.$Infer.Session;

export default function App({ session }: { session: Session | null }) {
  return (
    <Navbar isBordered shouldHideOnScroll maxWidth="xl">
      <NavbarBrand>
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
          <DropdownItem key="profile">
            <Link href={`/user/${session.user?.id}`}>My Profile</Link>
          </DropdownItem>
          <DropdownItem key="settings">
            <Link href="/settings">Settings</Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
}
