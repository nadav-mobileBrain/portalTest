"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const wrongAnswers = searchParams.get("wrongAnswers") || "0";

  return (
    <div className="text-lg font-semibold">Wrong Answers: {wrongAnswers}</div>
  );
}
