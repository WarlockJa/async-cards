import CardsLoader from "./_components/cards-loader";

export default async function CardsPage() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto px-2">
      <h1 className="text-4xl text-center py-8">Delayed Cards Loader</h1>
      <CardsLoader />
    </main>
  );
}
