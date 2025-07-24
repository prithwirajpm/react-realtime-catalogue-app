import React from "react";

function Navbar() {
  return (
    <div className="p-5 bg-gray-300 flex justify-between items-center text-white">
      <div className="font-bold">Product</div>
      <label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            className="h-5 w-5 fill-slate-300"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.9 14.32a8 8 0 111.41-1.41l4.3 4.3-1.41 1.41-4.3-4.3zM8 14a6 6 0 100-12 6 6 0 000 12z" />
          </svg>
        </span>
        <input
          className="placeholder:italic text-black placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Search for anything..."
          type="text"
          name="search"
        />
      </label>

      <div className="font-bold">Logout</div>
    </div>
  );
}

export default Navbar;
