"use client";

export default function CardsErrorFallback({
  refetch,
  error,
}: {
  refetch: () => void;
  error: unknown;
}) {
  return (
    <header className="fixed top-0 inset-x-0 items-center gap-4 flex justify-center pt-28 flex-col">
      <div className="flex gap-2 items-center">
        <h1 className="text-4xl text-center py-8">Ошибка</h1>
        <button
          className="rounded-sm border py-1.5 px-2 cursor-pointer"
          onClick={refetch}
        >
          Повторить
        </button>
      </div>
      <p>Error: {JSON.stringify(error)}</p>
    </header>
  );
}
