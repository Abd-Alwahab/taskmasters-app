import { createClient } from "../_utils/supabase/server";

export async function getTasks() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  const { data: tasks, error } = await createClient()
    .from("tasks")
    .select("*")
    .eq("userId", user?.id);

  if (error) {
    throw new Error(error.message);
  }

  return tasks;
}
