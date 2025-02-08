import { getCsrfToken } from "./csrf";

export async function createTransaction(transactionData: any) {
  try {
    // Fetch CSRF token first
    const csrfToken = await getCsrfToken();

    // Send transaction creation request
    const response = await fetch("http://localhost:8000/transactions/api/transactions/", {
      method: "POST",
      credentials: "include", // Ensures session authentication works
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken, // Attach CSRF token
      },
      body: JSON.stringify(transactionData),
    });

    // Check if response is successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.detail || "Failed to create transaction"}`);
    }

    // Return response JSON
    return await response.json();
  } catch (error) {
    console.error("Transaction creation failed:", error);
    throw error;
  }
}
