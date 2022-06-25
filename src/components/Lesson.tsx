import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom'

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'recorded'
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>()

  const isAvailable = isPast(props.availableAt)
  const availableDateFormatted = format(
    props.availableAt,
    "EEEE', 'd ' de ' MMMM', às ' HH:mm",
    {
      locale: ptBR
    }
  )

  let isActiveLesson = props.slug === slug

  return (
    <Link
      to={`/event/lesson/${props.slug}`}
      onClick={FormEvent => {
        isAvailable ? null : FormEvent.preventDefault()
      }}
      className={`group ${isAvailable ? '' : 'opacity-50 cursor-not-allowed'} `}
    >
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div
        className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${
          isActiveLesson ? 'bg-green-500' : ''
        }`}
      >
        <header className="flex items-center justify-between">
          {isAvailable ? (
            <span
              className={`text-sm  font-medium flex items-center gap-2 ${
                isActiveLesson ? 'text-white' : 'text-blue-500'
              }`}
            >
              <CheckCircle size={20} />
              Conteudo Liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span className="text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold">
            {props.type === 'live' ? 'AO VIVO' : 'GRAVAÇÃO'}
          </span>
        </header>
        <strong
          className={`mt-5 block ${
            isActiveLesson ? 'text-white' : 'text-gray-200'
          }`}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  )
}
