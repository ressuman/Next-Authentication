import AuthForm from "@/components/auth/auth-form";
//import { getServerSession } from "next-auth";
import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function AuthPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        //window.location.href = "/";
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false,
//       },
//     };
//   }

//   const user = { email: session.user.email };

//   return {
//     props: {
//       user,
//     },
//   };
// }
