import { useEffect } from "react";


export default function useOutClick(ref, handler)
{
    useEffect(() =>
    {
        function listener(event)
        {
            if(!ref.current || ref.current.contains(event.target))
            {
                console.log(event.target);
                console.log(ref.current);
                return ;
            }

            handler();
        }

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        
        return () =>
            {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        }
    }, [ref, handler]);
}