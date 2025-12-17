const TOKEN_KEY = "uniboard_token";

function getApiBase() {
  return (import.meta.env.VITE_API_BASE_URL as string | undefined) || "/api";
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type") && init?.body) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${getApiBase()}${path}`, { ...init, headers });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) throw new Error((data as { error?: string }).error || "Request failed");
  return data;
}


