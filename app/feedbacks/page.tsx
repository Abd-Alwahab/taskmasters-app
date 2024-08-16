import NewFeedbackForm from '../_features/feedbacks/NewFeedbackForm'
import { getFeedbacks } from '../_services/feedbacksServices'

async function Feedbacks() {
  const feedbacks = await getFeedbacks()
  return (
    <div className="flex max-h-screen flex-col gap-16 overflow-y-auto rounded-lg bg-white px-6 py-8 pb-36">
      <div className="mx-auto flex w-full flex-col items-center gap-4">
        <h2 className="text-2xl">Tell us what you think</h2>
        <NewFeedbackForm />
      </div>

      <div>
        <h2 className="text-2xl">Recent Feedbacks</h2>

        <ul className="flex flex-col gap-2 rounded-lg bg-gray-100 p-4">
          {feedbacks?.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-3 rounded-lg bg-white p-2"
            >
              <span className="text-lg font-semibold">{item.title}</span>
              <p className="leading-7">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Feedbacks
