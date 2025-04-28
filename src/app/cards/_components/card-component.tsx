"use client";

export default function CardComponent({ text, title }: CardData) {
  return (
    <div className="rounded-2xl border p-4 hover:shadow-lg shadow group transition-shadow shadow-slate-50">
      <h2 className="text-2xl group-hover:underline">{title}</h2>
      <p>{text}</p>
    </div>
  );
}
