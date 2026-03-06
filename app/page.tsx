import { redirect } from "next/navigation";
import { getVisitorIdFromCookie } from "@/lib/visitor/session";

export default async function HomePage() {
  const visitorId = await getVisitorIdFromCookie();
  redirect(visitorId ? "/app/dashboard" : "/start");
}
