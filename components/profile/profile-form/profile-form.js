import { useRef } from "react";
import classes from "./profile-form.module.css";

export default function ProfileForm({ onChangePassword }) {
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;

    const passwordData = {
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    };

    try {
      await onChangePassword(passwordData);
    } catch (error) {
      console.error("Failed to change password:", error.message);
    }
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}
