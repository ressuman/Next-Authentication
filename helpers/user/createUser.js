export async function createUser(email, password) {
  try {
    const response = await fetch("/api/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
