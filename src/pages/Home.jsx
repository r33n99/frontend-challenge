import React from "react";
import { useAppSelector } from "../app/hooks";
import { CatImg } from "../components/CatImg";
import { Preloader } from "../components/Preloader";
import { selectState } from "../features/cats/catsSlice";

export const Home = () => {
  const { cats,isLoading } = useAppSelector(selectState);
  return (
    <div className="content">
      {isLoading ? <Preloader /> : cats.map((cat) => (
        <CatImg key={cat.id} url={cat.url} id={cat.id} />
      ))}
    </div>
  );
};
