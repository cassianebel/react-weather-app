import { useState, useEffect } from "react";

export default function useOrientation() {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "landscape"
  );

  useEffect(() => {
    const getOrientation = () =>
      window.innerHeight > window.innerWidth ? "portrait" : "landscape";

    setOrientation(getOrientation());

    const handleResize = () => {
      const newOrientation = getOrientation();
      setOrientation(newOrientation);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return orientation;
}
