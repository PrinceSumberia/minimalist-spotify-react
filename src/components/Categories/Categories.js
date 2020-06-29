import React, { useContext, useState } from "react";
import { CATEGORIES_URL } from "../../constants/constants";
import { DataContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import "./CategoriesStyles.scss";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

function Categories() {
  const { accessToken } = useContext(DataContext);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const [data] = useFetchData("", CATEGORIES_URL, headers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data.success) setLoading(false);
  }, [data.success]);

  let result;
  try {
    result = data.data.categories.items.map((item) => (
      <div key={item.id} className="categories__container">
        <div className="categories__media">
          <img
            alt={item.name}
            src={item.icons[0].url}
            className="categories__media__img"
          />
        </div>
        <div className="categories__title">
          <h3>{item.name}</h3>
        </div>
      </div>
    ));
  } catch (err) {}
  return loading ? <Loader /> : <div className="categories">{result}</div>;
}

export default Categories;
