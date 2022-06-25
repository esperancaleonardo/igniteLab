import { useState, FormEvent } from 'react'
import { XCircle, CheckCircle } from 'phosphor-react'
import { Logo } from '../components/Logo'
import { useNavigate } from 'react-router-dom'
import { useCreateSubscriberMutation } from '../graphql/generated'

export function Subscribe() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [createSubscriber, { loading }] = useCreateSubscriberMutation()

  async function handleSubmit(event: FormEvent) {
    event?.preventDefault()
    await createSubscriber({
      variables: { name, email }
    })

    navigate('/event')
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className=" w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma{' '}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">
            Escreva-se gratuitamente
          </strong>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-4 justify-between">
              <input
                onChange={e => setName(e.target.value)}
                className="bg-gray-900 rounded px-5 h-14"
                type="text"
                placeholder="Seu nome completo"
              />
              {name ? (
                <CheckCircle size={28} color="green" />
              ) : (
                <XCircle size={28} color="red" />
              )}
            </div>
            <div className="flex items-center gap-4 justify-between">
              <input
                onChange={event => setEmail(event.target.value)}
                className="bg-gray-900 rounded px-5 h-14"
                type="email"
                placeholder="Seu melhor email"
              />
              {email ? (
                <CheckCircle size={28} color="green" />
              ) : (
                <XCircle size={28} color="red" />
              )}
            </div>
            <button
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
              type="submit"
            >
              Garantir minha vaga!
            </button>
          </form>
        </div>
      </div>
      <img src="/src/assets/cold-mock.png" alt="" />
    </div>
  )
}
