import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-4 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Retirement Calculator
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Sign in to start planning your retirement
          </p>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
