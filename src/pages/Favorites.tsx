import React from "react";
import { useAppSelector } from "../app/hooks";
import { CatImg } from "../components/CatImg";
import { selectState } from "../features/cats/catsSlice";

export const Favorites = () => {
  const { favoritesCats } = useAppSelector(selectState);
  return (
    <div className="content">
      {!favoritesCats.length ? (
        <div className="favorites__title">Отсутсвуют любимые котики😢</div>
      ) : (
        favoritesCats?.map((cat) => (
          <CatImg key={cat.id} url={cat.url} id={cat.id} isFavoritePage />
        ))
      )}
    </div>
  );
};
