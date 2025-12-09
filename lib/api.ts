// lib/api.ts
export async function getPosts() {
  const res = await fetch(`${process.env.API_URL_BASE}/posts/published`);
  if (!res.ok) throw new Error("Erro ao buscar posts");
  return res.json();
}
