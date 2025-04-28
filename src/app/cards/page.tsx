import CardsLoader from "./_components/cards-loader";

export default async function CardsPage() {
  return (
    <div className="min-h-screen mx-auto px-2">
      <main className="pt-28">
        <CardsLoader />
      </main>
    </div>
  );
}
