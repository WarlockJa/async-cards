"use client";

import { useState, useEffect } from "react";
import { cardsSchema } from "../lib/cardsSchema";
import CardComponent from "./card-component";
import CardsLoadingFallback from "./cards-loading-fallback";

export default function CardsLoader() {
  const [data, setData] = useState<CardData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000);

        const response = await fetch(
          "https://node-test-server-production.up.railway.app/api/cards",
          {
            keepalive: true,
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);
        const jsonData = await response.json();
        const parsedData = cardsSchema.safeParse(jsonData);

        if (!parsedData.success) throw parsedData.error;

        setData(parsedData.data.cards);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <CardsLoadingFallback />;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((card) => (
        <CardComponent key={card.title} {...card} />
      ))}
    </ul>
  );
}
