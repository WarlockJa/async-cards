"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cardsSchema } from "../lib/cards-schema";
import getCardsDataPostProcess from "../lib/cards-data-postprocess";

interface FetchCardData {
  data: CardData[] | null;
  isLoading: boolean;
  isDisabledRefetch: boolean;
  error: null | unknown;
  refetchTrigger: boolean;
}

export default function useDelayedFetch() {
  const [fetchData, setFetchData] = useState<FetchCardData>({
    data: null,
    error: null,
    isDisabledRefetch: true,
    isLoading: true,
    refetchTrigger: false,
  });

  // ссылки на контроллер и таймауты для реализации 3-х секудной задержки повторного запроса
  const controllerRef = useRef<AbortController>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout>(null);
  const timeoutIdIsDisabledRef = useRef<NodeJS.Timeout>(null);

  // таймаут при первоначальном запуске компонента
  useEffect(() => {
    const timeoutId = setTimeout(
      () => setFetchData((prev) => ({ ...prev, isDisabledRefetch: false })),
      3000
    );
    timeoutIdIsDisabledRef.current = timeoutId;

    return () => {
      console.log("Cleanup");

      if (timeoutIdIsDisabledRef.current) {
        clearTimeout(timeoutIdIsDisabledRef.current);
      }
      controllerRef.current?.abort();
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      if (timeoutIdIsDisabledRef.current) {
        clearTimeout(timeoutIdIsDisabledRef.current);
      }
    };
  }, []);

  // обработка запроса к API
  useEffect(() => {
    if (!fetchData.isLoading) return;

    const controller = new AbortController();
    controllerRef.current = controller;

    const timeoutId = setTimeout(() => controller.abort(), 120000);
    timeoutIdRef.current = timeoutId;

    const delayedFetchData = async () => {
      try {
        const response = await fetch(
          "https://node-test-server-production.up.railway.app/api/cards",
          {
            keepalive: true,
            signal: controller.signal,
          }
        );

        // не вносим изменения если запрос был отменён
        if (controller.signal.aborted) {
          return;
        }

        clearTimeout(timeoutId);
        const jsonData = await response.json();
        const parsedData = cardsSchema.safeParse(jsonData);

        if (!parsedData.success) throw parsedData.error;

        // обработка пришедших данных, приведение к указанному формату
        const postProcessedData = getCardsDataPostProcess(
          parsedData.data.cards
        );

        setFetchData((prev) => ({
          ...prev,
          data: postProcessedData,
          isLoading: false,
        }));
      } catch (err) {
        // не вносим изменения если запрос был отменён
        if (!controller.signal.aborted) {
          setFetchData((prev) => ({
            ...prev,
            isLoading: false,
            error: err,
          }));
        }
      }
    };

    delayedFetchData();
  }, [fetchData.isLoading, fetchData.refetchTrigger]);

  const refetch = useCallback(() => {
    if (fetchData.isDisabledRefetch) return;

    // отмена запроса, сброс ссылок
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
    // очистка таймаутов для отменённого запроса
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    if (timeoutIdIsDisabledRef.current) {
      clearTimeout(timeoutIdIsDisabledRef.current);
      timeoutIdIsDisabledRef.current = null;
    }

    // сбрасываем состояние в дефолт, инициируем новый запрос
    setFetchData((prev) => ({
      data: null,
      error: null,
      isDisabledRefetch: true,
      isLoading: true,
      refetchTrigger: !prev.refetchTrigger,
    }));

    // установка таймаута в контексте нового запроса после которого может быть инициирован новый запрос
    timeoutIdIsDisabledRef.current = setTimeout(
      () => setFetchData((prev) => ({ ...prev, isDisabledRefetch: false })),
      3000
    );
  }, [fetchData.isDisabledRefetch]);

  return {
    data: fetchData.data,
    isLoading: fetchData.isLoading,
    error: fetchData.error,
    refetch,
    isDisabledRefetch: fetchData.isDisabledRefetch,
  };
}
