import {useEffect} from "react";

export default function NoFound(){

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [])


    return(
        <>
            404 -Page Not Found
        </>
    )
}
