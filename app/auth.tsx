"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation

const AuthPage = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [warning, setWarning] = useState(""); // State for warning message
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeNumber === "1234") {
      setWarning(""); // Clear warning if the input is correct
      router.push("/learning"); // Redirect to the learning page
    } else {
      setWarning("Invalid employee number. Please try again."); // Set warning message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Employee Authentication</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={employeeNumber}
          onChange={(e) => setEmployeeNumber(e.target.value)}
          placeholder="Enter Employee Number"
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Submit
        </button>
      </form>
      {warning && <p className="mt-4 text-red-500">{warning}</p>}{" "}
      {/* Display warning message */}
    </div>
  );
};

export default AuthPage;
