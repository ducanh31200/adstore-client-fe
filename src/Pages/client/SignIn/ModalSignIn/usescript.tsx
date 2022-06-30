import React from "react";

export const useScript = (url: string, onLoad: () => void) => {
  React.useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.onload = onLoad;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [url, onLoad]);
};
