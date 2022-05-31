import React from "react";
import { getCatsData } from "./features/cats/catsSlice";
import { useAppDispatch } from "./app/hooks";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { Header } from "./components/Header";
function App() {
  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  const [sizeCats, setSizeCats] = React.useState<number>(1);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (isFetching) {
      dispatch(getCatsData(sizeCats));
      setSizeCats((prev) => prev + 1);
      setIsFetching(false);
    }
  }, [isFetching, dispatch, sizeCats]);

  React.useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e: any): void => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      10
    ) {
      setIsFetching(true);
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
