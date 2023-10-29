import { useContext } from "react";
import { TopicContext } from "../context/TopicContext";

export const useTopicContext = () => {
    const context = useContext(TopicContext)
    if(!context){
        throw Error('Topic NA')
    }
    return context;
}