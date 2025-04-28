import LoaderSvg from "./loader-svg";

export default function CardsLoadingFallback() {
  return (
    <div className="flex gap-2 items-center justify-center">
      <LoaderSvg className="w-10 h-10 stroke-slate-100" />
      <h1 className="animate-pulse text-3xl">Loading...</h1>
    </div>
  );
}
