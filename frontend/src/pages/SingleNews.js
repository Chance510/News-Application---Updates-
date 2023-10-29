import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleNews = () => {
    console.log('entered SingleNews')
    const {id} = useParams();
    const [news, setNews] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSingleWorkout = async() => {
        const response = await fetch('http://localhost:4000/news/news/'+id);
        const json = await response.json();
        if(response.ok){
            setNews(json);
            setIsLoading(false);
        }

        
    }

    useEffect(() => {
        fetchSingleWorkout();
    }, [])
    
    

    return ( 
        <div >
            <div className="container-lg align-items-center">
                {!isLoading && 
                    <div className="wrap-all m-5 mt-3" style={{padding: "100px 25px 25px 25px"}}>
                        <div className="container-md">
                            <h2>{news.title}</h2>
                        </div>
                        <div className="d-flex news-body row mt-5">
                                <img className="d-flex col-4" style={{width: "200px", height: "200px"}} src={news.image} alt="newsimage" />
                                <div className="news-text col-8">
                                    <p>{news.body}</p>
                                    <p className="small"> ({news.categories[0].charAt(0).toUpperCase() + news.categories[0].slice(1)}) </p>
                                    <p>Written by: {news.authorName}</p>
                                </div>
                        </div>
                    </div>            
                }
            </div>
        </div>
    );
}
 
export default SingleNews;