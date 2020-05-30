import { useState, useEffect } from "react";
import axios from "axios";

export default (initialVal, url, headers) => {
  const [data, setData] = useState(initialVal);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    setLoading(!loading);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: { ...headers },
        });
        setData({
          data: response.data,
        });
      } catch (err) {
        console.log("err");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, loading]);
  return [data, handleFetch];
};
