import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center pt-8 bg-white md:bg-gray-50">
      {/* Logo */}
      <Link to="/vendor/home" className="mb-6">
        <h1 className="text-3xl font-bold italic text-black">
          Shop<span className="text-accent">Hub</span>
        </h1>
      </Link>

      {/* Signup Card */}
      <div className="w-full max-w-[350px] bg-white border border-gray-300 rounded-lg p-6 shadow-sm md:shadow-none">
        <h2 className="text-2xl font-medium mb-4">Create account</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1">Your name</label>
            <input 
              type="text" 
              placeholder="First and last name"
              className="w-full p-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Mobile number or email</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold mb-1">Password</label>
            <input 
              type="password" 
              placeholder="At least 6 characters"
              className="w-full p-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
            <p className="text-[10px] mt-1 text-gray-600 italic">Passwords must be at least 6 characters.</p>
          </div>

          <button 
            type="submit"
            className="w-full py-1.5 bg-primary hover:bg-primary-hover border border-gray-400 rounded shadow-sm text-sm font-medium transition-colors"
          >
            Continue
          </button>
        </form>

        <p className="text-xs mt-6 text-gray-700 leading-tight">
          By creating an account, you agree to Cocio's <a href="#" className="text-blue-600 hover:underline">Conditions of Use</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Notice</a>.
        </p>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs">
            Already have an account? <Link to="/vendor/login" className="text-blue-600 hover:underline hover:text-accent">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-10 py-6 border-t border-gray-200 w-full flex flex-col items-center bg-gray-50 md:bg-transparent">
        <div className="flex space-x-6 mb-2">
          <a href="#" className="text-xs text-blue-600 hover:underline">Conditions of Use</a>
          <a href="#" className="text-xs text-blue-600 hover:underline">Privacy Notice</a>
          <a href="#" className="text-xs text-blue-600 hover:underline">Help</a>
        </div>
        <p className="text-[10px] text-gray-500">© 2026-2027, Cocio.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
};

export default Signup;
