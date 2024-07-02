import React from "react";
import Link from "next/link";
const CompletedTask = () => {
  return (
    <div>
      <div className="flex gap-4">
        <button className="btn text-green-500 bg-slate-50 px-2 py-2">
          <Link href="/">Home</Link>
        </button>
        <button className="btn text-green-500 bg-slate-50 px-2 py-2">
          <Link href="/today">Today page </Link>
        </button>
      </div>
      <h1> This is a task completed page</h1>
    </div>
  );
};

export default CompletedTask;
