import { Link } from 'react-router-dom'

type PlaceholderPageProps = {
  title: string
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main className="grid h-full place-items-center p-6">
      <div className="text-center">
        <h1 className="font-display font-medium text-[27px]">{title}</h1>
        <p className="mt-2 text-muted">Esta tela ainda será construída.</p>
        <Link
          className="mt-4 inline-block font-semibold text-accent hover:underline"
          to="/sign-in"
        >
          Voltar para o login
        </Link>
      </div>
    </main>
  )
}
