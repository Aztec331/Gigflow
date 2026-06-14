// this page's isLogin state is flipped
// hence true is false and false is true
import { useState } from "react"
import { loginUser, registerUser } from "../api/auth"
import { useNavigate } from "react-router-dom"

export default function AuthPage() {

  const[isLogin, setIsLogin] = useState(false)

  const[formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleChange = (e) => {

  const { name, value } = e.target

  setFormData(prev => ({
    ...prev,
    [name]: value
  }) )

  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  setError("") // Clear previous errors

  //Register api 
  try{
    if(isLogin){
      // Check if passwords match
      if(formData.password !== formData.confirmPassword){
        setError('Passwords do not match')
        return
      }

      const response = await registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password
      })
      console.log('Register success:', response.data)
      setFormData({ name: "", email: "", password: "", confirmPassword: "" })
  }

  //Login api
  else{
      const response = await loginUser({
        email: formData.email,
        password: formData.password
      })
      console.log('Login success:', response.data)
      setFormData({ name: "", email: "", password: "", confirmPassword: "" })
      navigate("/")
    }
  }

  catch(error){
  setError(error.response?.data?.detail || error.message || 'Something went wrong')
  console.error('Error:', error.response?.data || error.message)
  }

  }


 
  return (

    <div className="Daddy flex flex-col items-center justify-center h-screen p-4 ">
      

    <div className="DaddyBox bg-slate-900 rounded-2xl p-15 text-white border border-blue-500">

    {/* Header */}
    <div className="text-center mb-6">
      
      <h1 className="text-4xl font-bold">Gigflow</h1>

      <p className="text-blue-500 text-sm font-semibold">
        {isLogin ? "Join the platform": "Welcome back !"}
      </p>

    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* FullName */}
      {isLogin && (
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-300 ">
          Full name
        </label>

        <input 
        type="text"
        placeholder="Aditya Babar"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-80 mt-1 px-3 py-2 bg-slate-800 border border-blue-500 rounded-lg text-white placeholder-gray-500"
        />
      </div>
      )}

      {/* Email Address */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-300 ">
          Email address
        </label>

        <input 
        type="email"
        placeholder="you@example.com"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-80 mt-1 px-3 py-2 bg-slate-800 border border-blue-500 rounded-lg text-white placeholder-gray-500"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-300 ">
          Password
        </label>

        <input 
        type="password"
        placeholder="••••••••••"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="w-80 mt-1 px-3 py-2 bg-slate-800 border border-blue-500 rounded-lg text-white placeholder-gray-500"
        />
      </div>

      {/* Confirm Password */}
      {isLogin && (
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-300 ">
          Confirm Password
        </label>

        <input 
        type="password"
        placeholder="••••••••••"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-80 mt-1 px-3 py-2 bg-slate-800 border border-blue-500 rounded-lg text-white placeholder-gray-500"
        />
      </div>
      )}

      {error && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm mt-4">
        {error}
        </div>
      )}


    {/* submit button */}
    <div className="flex justify-center">
    <button 
    type="submit"
    className="w-32 mt-2.5 font-bold bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-500 active:scale-90 transition-all">
    {isLogin ? 'Create account' : 'Sign in'}
    </button>
    </div>


    </form>

    {/* Divider */}
    <div className="FatherOfLines flex justify-center items-center my-6">

    <div className="flex-grow h-px bg-blue-400"></div>
      
      <span className="px-4 text-gray-400 text-sm">or</span>
      
    <div className="flex-grow h-px bg-blue-400"></div>

    </div>

    {/* Sign in/Sign up toggle button */}
    <p className="text-center text-sm text-gray-400">
      {isLogin ? "Already have an account ? " : "Don't have an account ? "}
      <button
      type="button"
      onClick={ () => setIsLogin(!isLogin) }
      className="text-blue-400 hover:text-blue-300 font-semibold"
      >
      {isLogin ? "Sign in" : "Sign up"}
      </button>
    </p>

    




    





    </div>

    <div  className="text-white text-sm mt-5">
    By continuing, you agree to our 
    Terms of Service and Privacy Policy.
    </div>


    </div>

  )

}