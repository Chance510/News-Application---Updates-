import { useEffect, useState } from "react";
import NewsDetails from "../Components/NewsDetails";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNewsContext } from "../hooks/useNewsContext";

const MyFeed = () => {
    const {user} = useAuthContext()
    const {news, dispatch} = useNewsContext()

    useEffect(() => {
        const fetchFeedNews = async() => {
            console.log(user)
            const response = await fetch('https://updates-v1-server.vercel.app/news/myfeed', {
                headers: {'Authorization': `Bearer ${user.token}`}
            })

            const json = await response.json();
            let setter = []
            json.forEach(piece => {
                setter = setter.concat(piece);
            })
            if(response.ok){
                dispatch({type: 'SET_NEWS', payload: setter});
            }
        }
        

        fetchFeedNews()
        console.log(typeof(news));
        console.log(news)


    }, [dispatch])

    return ( 
        <div className="bg-secondary-subtle text-emphasis-secondary">
            <div className="home container-lg pt-5">
                <div className="news-display">
                    {news && news.map((nt) => (
                       <NewsDetails key={nt._id} n={nt}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default MyFeed;