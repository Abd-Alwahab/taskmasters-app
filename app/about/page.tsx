import Image from 'next/image'
import { ComponentType } from 'react'
import {
  MdCategory,
  MdAddTask,
  MdAnalytics,
  MdStar,
  MdLowPriority,
  MdDragIndicator,
} from 'react-icons/md'
import AboutImage from '@/public/about-001.png'
import EmblaCarousel from '../_components/Slider'

interface Feature {
  title: string
  description: string
  icon: ComponentType<{ fontSize: number; color: string }> // Type for React components
}

const features: Feature[] = [
  {
    title: 'Effortless Organization with Custom Categories',
    description:
      'Take control of your tasks by creating personalized categories that perfectly match your workflow. Need to adjust your categories on the fly? No problem! Simply drag and drop them to reorder, ensuring your most important tasks are always front and center.',
    icon: MdCategory,
  },
  {
    title: 'Seamless Task Creation and Categorization',
    description:
      'Adding tasks to your to-do list is a breeze. Create tasks and effortlessly assign them to the relevant categories, keeping your workload organized and focused.',
    icon: MdAddTask,
  },
  {
    title: 'Data-Driven Insights for Optimal Performance',
    description:
      'Make informed decisions with our comprehensive task and category statistics. Gain valuable insights into your productivity patterns, allowing you to identify areas for improvement and celebrate your achievements.',
    icon: MdAnalytics,
  },
  {
    title: 'Gamified Motivation with Task Points',
    description:
      'Inject a bit of fun into your productivity journey. Assign point values to each task, turning your to-do list into a rewarding game where you can track your progress and strive for higher scores.',
    icon: MdStar,
  },
  {
    title: 'Prioritize with Precision',
    description:
      "Not all tasks are created equal. That's why we offer customizable priority levels (low, medium, high) for each task. Easily identify what needs immediate attention and what can wait, ensuring you're always working on what matters most.",
    icon: MdLowPriority,
  },
  {
    title: 'Instant Re-Categorization with Drag-and-Drop',
    description:
      "Changed your mind about where a task belongs? No worries! Simply drag the task from one category column to another, and it'll instantly update. This flexible feature keeps your task management dynamic and adaptable.",
    icon: MdDragIndicator,
  },
]

const About = () => {
  return (
    <div className="flex h-full flex-col justify-between gap-12 rounded-lg bg-white px-14 py-16">
      <div className="grid grid-cols-[1fr_35rem] gap-12">
        <div className="">
          <h1 className="mb-6 w-fit border-b-2 border-amber-600 pb-2 text-3xl font-bold">
            About
          </h1>
          <p className="text-base leading-9">
            Conquer your to-do list with our intuitive task management platform.
            Organize tasks into customizable categories, effortlessly track your
            progress with detailed statistics, and gamify your productivity with
            point values. Prioritize tasks with ease, and dynamically rearrange
            them using simple drag-and-drop actions. Achieve your goals faster
            with our flexible and insightful tools.
          </p>
        </div>

        <div className="relative flex w-fit justify-end overflow-hidden rounded-2xl border-2 border-white shadow-2xl">
          <Image src={AboutImage} alt="about" width={500} height={500} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <EmblaCarousel slides={features?.length ?? 0}>
          {features.map((feature) => (
            <div
              className="embla__slide relative overflow-hidden bg-white px-3"
              key={feature.title}
            >
              {/* <div className="absolute right-0 top-0 z-0 size-full border border-gray-300" /> */}
              <div className="embla__slide__number relative z-10 px-4">
                <div className="mx-auto w-full">
                  <div className="grid grid-cols-1 justify-items-center gap-4 text-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-amber-600">
                      <feature.icon fontSize={32} color="white" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-lg font-semibold text-gray-900">
                        {feature.title}
                      </span>
                      <span className="text-base leading-7 text-gray-700">
                        {feature.description}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </EmblaCarousel>
        {/* {features.map((feature) => (
          <div key={feature.title} className="mx-auto w-full">
            <div className="grid grid-cols-[auto_1fr] gap-4">
              <div className="flex size-16 items-center justify-center rounded-full bg-amber-500">
                <feature.icon fontSize={32} color="white" />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </span>
                <span className="text-base leading-7 text-gray-700">
                  {feature.description}
                </span>
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default About
