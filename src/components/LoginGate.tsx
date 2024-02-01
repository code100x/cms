"use client";

export const LoginGate = () => {
  return <div className="m-32">
    <div className="justify-center flex">
      Please signin to continue
    </div>
    <br />
    <div className="justify-center flex">
      <button onClick={() => {
        window.location.href = "/api/auth/signin"
      }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sign in
      </button>
    </div>
  </div >
}

