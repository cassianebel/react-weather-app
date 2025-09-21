import { useState, useEffect } from "react";

export default function useOrientation() {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    () => {
      if (typeof window !== "undefined") {
        return window.innerHeight > window.innerWidth
          ? "portrait"
          : "landscape";
      }
      return "landscape";
    }
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
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return orientation;
}
