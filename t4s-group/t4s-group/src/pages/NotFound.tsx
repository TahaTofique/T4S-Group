import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-4xl text-white">Page not found</h1>
      <p className="mt-3 max-w-sm text-sm text-mist">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Return Home
      </Link>
    </section>
  )
}
