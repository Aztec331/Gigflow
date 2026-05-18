import { useState } from 'react'

export default function Rough() {
  const [isLogin, setIsLogin] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add auth logic here later
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      {/* Glow effect background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-900 bg-opacity-80 backdrop-blur-xl border border-blue-500 border-opacity-20 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">GigFlow</h1>
            <p className="text-blue-300 text-sm font-medium">
              {isLogin ? 'Welcome back' : 'Join the platform'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field - only show in register mode */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:border-opacity-100 transition-all"
                />
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 bg-slate-800 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:border-opacity-100 transition-all"
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-slate-800 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:border-opacity-100 transition-all"
              />
            </div>

            {/* Confirm Password - only show in register mode */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:border-opacity-100 transition-all"
                />
              </div>
            )}

            {/* Forgot password - only show in login mode */}
            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 mt-6 transform hover:scale-105"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-blue-500 border-opacity-20"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-blue-500 border-opacity-20"></div>
          </div>

          {/* Toggle between login and register */}
          <p className="text-center text-gray-400 text-sm">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Footer text */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}