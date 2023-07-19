import { useRef, useEffect } from 'react';


const useMounted = () => {
    const mounted = useRef(false);

    const mountCheckWrapper = (func) => {
        if (!mounted.current) {
            return;
        }

        func();
    };

    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, []);

    return {
        mounted,
        mountCheckWrapper
    };
};

export default useMounted;
