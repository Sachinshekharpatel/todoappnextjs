import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>This is TODO List</h1>
      <button className="btn text-green-500 bg-slate-50 px-2 py-2">
        <Link href="/today">Go to Today</Link>
      </button>
    </>
  );
}
