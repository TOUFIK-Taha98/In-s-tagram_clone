// Server component
import { redirect } from "next/navigation";

async function Page() {
  // Redirecting any single user coming from the route "/" to "/dashboard"
  redirect("/dashboard");
}

export default Page;

// All this code is rendered on the server
