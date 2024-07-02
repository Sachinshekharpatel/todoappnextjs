import Link from "next/link";
import React from "react";

const TodayPage = () => {
  return (
    <div>
     <div className="flex gap-4">
     <button className="btn text-green-500 bg-slate-50 px-2 py-2">
        <Link href="/">Home</Link>
      </button>
      <button className="btn text-green-500 bg-slate-50 px-2 py-2">
        <Link href="/today/completedtask">Completed Task</Link>
      </button>
     </div>
      <h1> this is a today page</h1>
    </div>
  );
};

export default TodayPage;
