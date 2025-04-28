"use client";

import CardComponent from "./card-component";
import CardsLoadingFallback from "./cards-loading-fallback";
import useDelayedFetch from "../hooks/use-delayed-fetch";
import CardsHeader from "./cards-header";
import CardsErrorFallback from "./cards-error-fallback";

export default function CardsLoader() {
  const { data, error, isLoading, refetch, isDisabledRefetch } =
    useDelayedFetch();

  let content;

  if (isLoading) {
    content = <CardsLoadingFallback />;
  } else if (error) {
    content = <CardsErrorFallback error={error} refetch={refetch} />;
  } else {
    content = (
      <ul className="flex gap-2 items-center justify-center flex-col md:flex-row flex-wrap">
        {data?.map((card, index) => (
          <CardComponent
            key={index}
            {...card}
            className="group hover:shadow-lg"
          />
        ))}
      </ul>
    );
  }

  return (
    <div>
      <CardsHeader refetch={refetch} isDisabledRefetch={isDisabledRefetch} />
      {content}
    </div>
  );
}
