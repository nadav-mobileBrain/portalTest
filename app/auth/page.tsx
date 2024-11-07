"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [warning, setWarning] = useState("");
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const router = useRouter();
  const { toast } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeNumber === "1234") {
      setWarning("");
      router.push("/learning");
    } else {
      const newAttempts = wrongAttempts + 1;
      setWrongAttempts(newAttempts);
      setWarning("מספר עובד שגוי. נסה שוב.");
      toast({
        variant: "destructive",
        title: "מספר עובד שגוי",
        description: "נסה שוב",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4"> הכנס מספר עובד רמי לוי</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={employeeNumber}
          onChange={(e) => setEmployeeNumber(e.target.value)}
          placeholder="הכנס מספר עובד"
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          הכנס
        </button>
      </form>
      {warning && (
        <div className="mt-4 flex flex-col items-center">
          {/* <p className="text-red-500">{warning}</p> */}
          <p className="text-sm text-red-500 font-semibold mt-2">
            Failed attempts: {wrongAttempts}
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
