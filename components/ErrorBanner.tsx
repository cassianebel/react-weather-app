import { useBackground } from "../context/BackgroundContext";

export default function ErrorBanner() {
  const { error, showImage } = useBackground();
  if (!error || !showImage) return null;

  return (
    <div>
      <p className="text-center">{error}</p>
    </div>
  );
}
