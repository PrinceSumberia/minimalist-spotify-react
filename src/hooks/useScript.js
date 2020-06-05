import { useEffect } from "react";

export default (url) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
    console.log("SDK Script Inserted");
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};
