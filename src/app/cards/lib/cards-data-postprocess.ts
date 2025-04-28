export default function getCardsDataPostProcess(
  cardsData: CardData[]
): CardData[] {
  const plugData = Array.from({
    length: 7 - cardsData.length,
  }).fill({
    text: "",
    title: "",
  }) as CardData[];

  // сортировка, урезание, добавление пустых элементов
  const sortedData = cardsData
    .sort((a, b) =>
      a.title > b.title ? 1 : a.text.length > b.text.length ? 1 : -1
    )
    .slice(0, 6)
    .concat(plugData);

  return sortedData;
}
