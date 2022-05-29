import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import heart from "../assets/img/heart.png";
import favorite from "../assets/img/heart-favorite.png";
import {
  addFavoriteCat,
  deleteFavoriteCat,
  selectState,
} from "../features/cats/catsSlice";
export const CatImg = ({
  url,
  id,
  isFavoritePage,
}) => {
  const { favoritesCats } = useAppSelector(selectState);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    isFavoritePage
      ? dispatch(deleteFavoriteCat(id))
      : dispatch(addFavoriteCat(id));
  };
  return (
    <div className="cat">
      <img className="cat__img" src={url} alt="cat" />
      <div className="cat__heart">
        /
        <img
          onClick={() => handleClick()}
          src={favoritesCats.find((el) => el.id === id) ? favorite : heart}
          alt="asd"
        />
      </div>
    </div>
  );
};
