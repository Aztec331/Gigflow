export default function AuthPage() {

  return (

    <div className="Daddy flex flex-col items-center justify-center h-screen p-4 ">
      

    <div className="DaddyBox bg-slate-900 rounded-2xl p-8 text-white border border-blue-500">

    {/* Header */}
    <div className="text-center mb-6">
      
      <h1 className="text-4xl font-bold">Gigflow</h1>
      <p className="text-blue-500 text-sm font-semibold">Join the platform</p>

    </div>

    {/* Form */}
    <form className="space-y-5">

      {/* FullName */}
      <div className="flex flex-col">

        <label className="text-sm font-medium text-gray-300 ">
          Full name
        </label>

        <input 
        type="text"
        placeholder="Aditya Babar"
        id="name"
        name="name"
        className="w-80 mt-1 px-3 py-2 bg-slate-800 border border-blue-500 rounded-lg text-red placeholder-gray-500"
        />

      </div>

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
        className="w-80 mt-1 px-3 py-2 bg-slate-800 border border-blue-500 rounded-lg text-red placeholder-gray-500"

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
        className="w-80 mt-1 px-3 py-2 bg-slate-800 border border-blue-500 rounded-lg text-red placeholder-gray-500"
        />

      </div>

      {/* Confirm Password */}
      <div className="flex flex-col">

        <label className="text-sm font-medium text-gray-300 ">
          Confirm Password
        </label>

        <input 
        type="password"
        placeholder="••••••••••"
        id="confirmPassword"
        name="confirmPassword"
        className="w-80 mt-1 px-3 py-2 bg-slate-800 border border-blue-500 rounded-lg text-red placeholder-gray-500"
        />

      </div>

    {/* submit button */}
    <button 
    type="submit"
    className="w-full mt-2.5 font-bold ">
      Create Account
    </button>


    </form>

    {/* Divider */}
    <div className="FatherOfLines flex justify-center">

      <div className="">
        Line
      </div>
      or
      <div>
        Line
      </div>


    </div>




    





    </div>

    <div  className="text-white text-sm mt-5">
    By continuing, you agree to our 
    Terms of Service and Privacy Policy.
    </div>


    </div>

  )

}