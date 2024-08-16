import NewFeedbackForm from '../_features/feedbacks/NewFeedbackForm'

function Feedbacks() {
  return (
    <div className="h-full rounded-lg bg-white px-6 py-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl">Tell us what you think</h2>
        <NewFeedbackForm />
      </div>
    </div>
  )
}

export default Feedbacks
