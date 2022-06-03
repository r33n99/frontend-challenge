import React, { useEffect, useRef } from 'react';
import { CatImg } from '../components/CatImg';
import { Preloader } from '../components/Preloader';
import { getCatsData, selectState } from '../features/cats/catsSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useObserver } from '../hooks/useObserver';

export const Home = () => {
    const lastElement = useRef(null);
    const { cats, isLoading } = useAppSelector(selectState);

    const [page, setPage] = React.useState(1);

    const dispatch = useAppDispatch();

    useObserver(lastElement, isLoading, () => {
        setPage((prev) => prev + 1);
    });

    useEffect(() => {
        dispatch(getCatsData(page));
    }, [page]);

    return (
        <div className="content">
            {isLoading && !cats?.length ? (
                <Preloader />
            ) : (
                <>
                    {cats?.map((cat) => (
                        <CatImg key={cat.id} url={cat.url} id={cat.id} />
                    ))}
                    <div style={{ background: 'black' }} ref={lastElement} />
                </>
            )}
        </div>
    );
};
