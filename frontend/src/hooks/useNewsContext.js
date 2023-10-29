import { useContext } from "react"
import { NewsContext } from "../context/NewsContext"

export const useNewsContext = () => {
    const context = useContext(NewsContext);

    if(!context){
        throw Error('Context NA');
    }

    return context;
}