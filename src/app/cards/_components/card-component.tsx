"use client";

import { cn } from "../lib/utils";

export default function CardComponent({
  text,
  title,
  className,
}: CardData & { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 shadow transition-shadow shadow-slate-50 w-[200px] aspect-square space-y-1.5",
        className
      )}
    >
      <h2 className="text-xl group-hover:underline">{title}</h2>
      <p className="text-wrap">{text}</p>
    </div>
  );
}
