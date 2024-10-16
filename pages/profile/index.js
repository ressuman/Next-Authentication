import { getServerSession } from "next-auth/next";
import UserProfile from "@/components/profile/user-profile/user-profile";
import { authOptions } from "../api/auth/[...nextauth]";
//import { authOptions } from "@pages/api/auth/[...nextauth]";
//import { authOptions } from "../api/auth/[...nextAuth]";

export default function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const user = { email: session.user.email };

  return {
    props: {
      user,
    },
  };
}
