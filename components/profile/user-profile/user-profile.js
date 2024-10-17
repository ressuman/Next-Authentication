import ProfileForm from "../profile-form/profile-form";
import classes from "./user-profile.module.css";
import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";

export default function UserProfile() {
  const [isLoading, setIsLoading] = useState(true);
  //const [loadedSession, setLoadedSession] = useState();

  useEffect(() => {
    getSession().then((session) => {
      //setLoadedSession(session);

      if (!session) {
        window.location.href = "/auth";
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  //const { data: session, status } = useSession();
  //const loading = status === "loading";

  // if (status === "loading") {
  //   return <p className={classes.profile}>Loading...</p>;
  // }
  if (isLoading) {
    return <p className={classes.profile}>Loading...</p>;
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}
