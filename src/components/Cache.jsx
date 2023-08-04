import {useEffect} from "react";

const Cache = () => {
    useEffect(()=>{
        window.scrollTo(0, 0)
    }, [])


    const clearCacheData = () => {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
        alert('Complete Cache Cleared')
    };

    return (
        <div style={{ height: 500, width: '80%' }}>
            <h4>How to clear complete cache data in ReactJS?</h4>
            <button onClick={() => clearCacheData()} >
                Clear Cache Data</button>
        </div>
    );
}

export default Cache;
