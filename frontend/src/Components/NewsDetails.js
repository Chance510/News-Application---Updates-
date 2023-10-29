import { Link } from "react-router-dom";

const newsDetails = ({n}) => {
    const str1 = n.categories[0];
    const capitalised = str1.charAt(0).toUpperCase() + str1.slice(1);
    const str2 = n.body;
    const highlight = str2.slice(0, 100);
    return ( 
        <div>
            <div className="container py-2">
                <div className="card" style={{width: "75%"}}>
                    <div className="card-body">
                        <Link to={`/news/${n._id}`} className="link-opacity-50-hover link-underline link-underline-opacity-0 text-dark">
                            <h5 className="p-2 m-2 card-title ">
                                {n.title}
                            </h5>
                        </Link>
                        <Link to={`/news/${n._id}`}>
                            <div className="d-flex float-end col-md-2 align-items-right"><img className="img-float item-image" src={n.image} alt="new" style={{height: "100px", width: "120px"}}/>
                            </div>
                        </Link>
                        <p className="col-4 px-3 m-1 card-text"><strong>Written by:</strong> {n.authorName}</p>
                        <div className="w-100"></div>
                        <p className="p-2 pt-2 px-4 card-text">{highlight}...</p>
                        <p className="col-4 px-3 m-1 card-text">{capitalised}</p>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
 
export default newsDetails;