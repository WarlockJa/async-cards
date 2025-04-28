import CardComponent from "./card-component";

export default function CardsLoadingFallback() {
  return (
    <div className="flex gap-2 items-center justify-center flex-col md:flex-row flex-wrap">
      <CardComponent className="animate-pulse" text="" title="loading..." />
      <CardComponent className="animate-pulse" text="" title="loading..." />
      <CardComponent className="animate-pulse" text="" title="loading..." />
      <CardComponent className="animate-pulse" text="" title="loading..." />
      <CardComponent className="animate-pulse" text="" title="loading..." />
      <CardComponent className="animate-pulse" text="" title="loading..." />
      <CardComponent className="animate-pulse" text="" title="loading..." />
    </div>
  );
}
