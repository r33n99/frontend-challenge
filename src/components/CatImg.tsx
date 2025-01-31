import React, { FC } from 'react';
import heart from '../assets/img/heart.png';
import favorite from '../assets/img/heart-favorite.png';
import { addFavoriteCat, deleteFavoriteCat, selectState } from '../features/cats/catsSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';

interface CatImgProps {
    url: string;
    id: string;
    isFavoritePage?: boolean;
}
export const CatImg: FC<CatImgProps> = ({ url, id, isFavoritePage }) => {
    const { favoritesCats } = useAppSelector(selectState);
    const dispatch = useAppDispatch();

    const handleClick = (e: React.UIEvent<EventTarget>) => {
        isFavoritePage // если находимся на странице избранного выполняем только удаление
            ? dispatch(deleteFavoriteCat(id))
            : dispatch(addFavoriteCat(id));
        if (e.detail === 2) {
            dispatch(deleteFavoriteCat(id)); // при двойном клике удаляем из избранного
        }
    };
    return (
        <div className="cat">
            <img className="cat__img" src={url} alt="cat" />
            <div className="cat__heart">
                <img
                    onClick={(e) => handleClick(e)}
                    src={favoritesCats.find((el) => el.id === id) ? favorite : heart}
                    alt="asd"
                />
            </div>
        </div>
    );
};
