import { createClient } from '../_utils/supabase/server'

export async function getFeedbacks() {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null

  const { error, data: feedbacks } = await createClient()
    .from('feedbacks')
    .select('*')
    .eq('userId', user?.id)

  if (error) {
    throw new Error(error.message)
  }

  return feedbacks
}
