async function fetchClerkUser(userId) {
    const response = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch Clerk user");
    }
  
    return await response.json();
  }
  
  module.exports = fetchClerkUser;
  