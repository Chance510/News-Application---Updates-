import { useEffect } from "react";

//components
import NewsDetails from "../Components/NewsDetails";

//Context
import { useNewsContext } from "../hooks/useNewsContext";
import { useTopicContext } from "../hooks/useTopicContext";

const Home = () => {
    const {news, dispatch: newsdispatch} = useNewsContext();
    const {topic, dispatch} = useTopicContext();

    useEffect(() => {
        const fetchNews = async() => {
            if(topic === 'all'){
                const response = await fetch('http://localhost:4000/news/'+topic);
                const json = await response.json();
                newsdispatch({type: 'SET_NEWS', payload: json});
            }
            else{
                const response = await fetch('http://localhost:4000/news/topics/'+topic);
                const json = await response.json();
                newsdispatch({type: 'SET_NEWS', payload: json});
            }
        }

        fetchNews();

    }, [dispatch, newsdispatch, topic]);

    return ( 
        <div className="bg-secondary-subtle text-emphasis-secondary">
            <div className="home container-lg pt-5">
                <div className="news-display">
                    {news && news.map((n) => (
                        <NewsDetails key={n._id} n={n} />
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default Home;