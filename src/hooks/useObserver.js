import { useEffect, useRef } from 'react';

export const useObserver = (ref, isLoading, callback) => {
    const observer = useRef();
    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        var cb = function (entries, observer) {
            if (entries[0].isIntersecting) {
                callback();
                console.log('ВИДНО');
            }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current);
    }, [isLoading]);
};
