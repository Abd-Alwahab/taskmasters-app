import { createClient } from "../_utils/supabase/server";

export async function getCategories() {
  const { data: categories, error } = await createClient()
    .from("categories")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return categories;
}
