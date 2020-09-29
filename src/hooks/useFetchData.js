import { useEffect, useState } from "react";
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
        const response = await axios
          .get(url, {
            headers: { ...headers },
          })
          .catch((err) => {
            if (err.response.status === 401) {
              console.log("Access Token Expired");
              setData({ ...data, success: false, status: err.response.status });
              return;
            }
          });
        setData({
          success: true,
          status: response.status,
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
