import { createClient } from "../_utils/supabase/server";

export async function getCategories() {
  const {
    data: { session },
  } = await createClient().auth.getSession();

  if (!session) return null;
  const { user } = session;

  const { data: categories, error } = await createClient()
    .from("categories")
    .select("*")
    .eq("userId", user?.id);

  if (error) {
    throw new Error(error.message);
  }

  return categories;
}
