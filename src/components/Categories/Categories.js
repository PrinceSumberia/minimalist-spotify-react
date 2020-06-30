import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CATEGORIES_URL } from "../../constants/constants";
import { DataContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../Loader/Loader";
import "./CategoriesStyles.scss";

function Categories() {
  let history = useHistory();
  let url = CATEGORIES_URL;
  const { accessToken } = useContext(DataContext);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const [categories, setCategories] = useState([]);

  const [data] = useFetchData("", url, headers);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data.success) {
      setCategories(data.data.categories.items);
      setLoading(false);
    }
  }, [data]);

  const handleClick = (e) => {
    const id = e.currentTarget.id;
    const arr = categories.filter((item) => item.id === id);
    const name = arr[0].name;
    history.push({
      pathname: `/dashboard/browse/category/${id}`,
      state: { name },
    });
  };

  let result = categories.map((item) => (
    <div
      key={item.id}
      id={item.id}
      className="categories__container"
      onClick={handleClick}
    >
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

  return loading ? <Loader /> : <div className="categories">{result}</div>;
}

export default Categories;
