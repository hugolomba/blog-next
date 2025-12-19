import { redirect } from "next/navigation";
import SettingsClient from "./settings-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return <SettingsClient />;
}
