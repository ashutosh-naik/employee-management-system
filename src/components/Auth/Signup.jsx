import React, { useState } from "react";

const Signup = ({ handleSignUp, switchToLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    handleSignUp({
      firstName: firstName.trim(),
      email: email.trim(),
      password,
    });
    setFirstName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="border-2 rounded-xl border-emerald-600 p-10">
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center justify-center"
        >
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400"
            type="text"
            placeholder="Enter your first name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400"
            type="email"
            placeholder="Enter your email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400"
            type="password"
            placeholder="Enter password"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400"
            type="password"
            placeholder="Confirm password"
          />
          <button className="mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full">
            Sign up
          </button>
          <button
            type="button"
            onClick={switchToLogin}
            className="mt-3 text-sm text-gray-400 underline"
          >
            Already have an account? Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
