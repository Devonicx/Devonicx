import { useEffect } from "react";

const usePreventPrint = (showPrint: boolean) => {
  useEffect(() => {
    const handleKeydown = (event: any) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === "p" || event.key === "P")
      ) {
        if (!showPrint) {
          event.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [showPrint]);
};

export default usePreventPrint;
