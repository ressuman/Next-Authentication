// export async function changePassword(passwordData) {
//   try {
//     const response = await fetch("/api/user/change-password", {
//       method: "PATCH",
//       body: JSON.stringify(passwordData),
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to change password");
//     }

//     return data; // Return the success response if needed
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

export async function changePassword(passwordData) {
  try {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to change password");
    }

    return await response.json(); // Return the success response
  } catch (error) {
    console.error("Error in changePassword:", error); // Debug log
    throw new Error(error.message);
  }
}
