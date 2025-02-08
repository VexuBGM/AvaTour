export async function getCsrfToken(): Promise<string> {
  const response = await fetch("http://localhost:8000/api/csrf/", {
    credentials: "include", 
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch CSRF token: ${response.status}`);
  }

  const data = await response.json();
  return data.csrftoken; 
}
