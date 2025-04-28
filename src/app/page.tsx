import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen max-w-5xl min-h-screen flex p-6">
      <Link href={"/cards"} className="text-3xl hover:underline">
        To Cards
      </Link>
    </main>
  );
}
