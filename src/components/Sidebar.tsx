import { Lesson } from './Lesson'
import { useLessonsQueryQuery } from '../graphql/generated'

export function Sidebar() {
  const { loading, error, data } = useLessonsQueryQuery()

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-600 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map(lesson => {
          return (
            <Lesson
              key={lesson.id}
              availableAt={new Date(lesson.availableAt)}
              slug={lesson.slug}
              title={lesson.title}
              type={lesson.lessonType}
            />
          )
        })}
      </div>
    </aside>
  )
}
