"use client";

export default function CardsHeader({
  isDisabledRefetch,
  refetch,
}: {
  isDisabledRefetch: boolean;
  refetch: () => void;
}) {
  return (
    <header className="fixed top-0 inset-x-0 items-center gap-4 flex justify-center bg-slate-900">
      <h1 className="text-4xl text-center py-8">Карточки</h1>
      <button
        disabled={isDisabledRefetch}
        className="rounded-sm border py-1.5 px-2 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
        onClick={refetch}
      >
        Обновить
      </button>
    </header>
  );
}
