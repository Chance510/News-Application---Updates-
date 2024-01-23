import { useEffect, useState } from "react";
import NewsDetails from "../Components/NewsDetails";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNewsContext } from "../hooks/useNewsContext";

const MyFeed = () => {
    const {user} = useAuthContext()
    const {news, dispatch} = useNewsContext()
    const [wait, setWait] = useState(true);

    useEffect(() => {
        const fetchFeedNews = async() => {
            const response = await fetch('http://localhost:4000/news/myfeed', {
                headers: {'Authorization': `Bearer ${user.token}`}
            })

            const json = await response.json();

            if(response.ok){
                dispatch({type: 'SET_NEWS', payload: json});
            }
            console.log(`This is JSON ${json[0][0]}`);
        }
        

        fetchFeedNews()
        console.log(typeof(news));


    }, [])

    return ( 
        <div className="bg-secondary-subtle text-emphasis-secondary">
            <div className="home container-lg pt-5">
                <div className="news-display">
                    {!wait && news && news.forEach(nt => {
                       console.log(`This is nt ${nt}`);
                       console.log(`This is nt[0] ${nt[0]}`)
                       nt.forEach(n => {
                        console.log(`This is n ${n}`);
                        <NewsDetails key={n._id} n={n} />
                       }) 
                    })}
                </div>
            </div>
        </div>
    );
}
 
export default MyFeed;