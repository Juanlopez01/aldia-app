import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function IsLogged() {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/auth");
  }

  return null;
}
