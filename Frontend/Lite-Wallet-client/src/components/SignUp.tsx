import React from 'react'

const SignUp = () => {
  return (
    <div>
      <section className="flex min-h-screen bg-gray-50">
        <div className="hidden lg:flex w-1/2 text-white items-center justify-center p-12" 
        style={{ backgroundImage: "url('/background.jpeg')" }}>
          <div className="max-w-md text-center space-y-6">
            <h1 className="text-4xl font-bold">Lite wallet</h1>
            <p className="text-lg text-gray-200">
              Set up in seconds. Send, receive, and manage money — effortlessly.
            </p>
                    
          </div>
        </div>



<div
  className="hidden lg:flex w-1/2 text-white items-center justify-center p-12 bg-cover bg-center relative overflow-hidden"style={{ backgroundImage: "url('/background.jpeg')" }}
>
  <div className="max-w-md text-center space-y-6">
    <h1 className="text-4xl font-bold">Lite Wallet</h1>
    <p className="text-lg text-gray-200">
      Set up in seconds. Send, receive, and manage money — effortlessly.
    </p>
  </div>
</div>



      </section>
    </div>
  )
}

export default SignUp
