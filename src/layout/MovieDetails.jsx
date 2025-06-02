
import React, {useState, useEffect} from "react"
import { useNavigate, useParams } from "react-router"
import { Preloader } from "../components/preloader";



export function MovieDetails() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=b0887c9e&i=${id}`)
        .then((response) => response.json())
        .then((data) => {
            if(data.Response === "True") {
                setMovie(data)
            } else{
                setError(data.Error || "Movie not found")
                navigate("/", {replace: true})
            }
            setLoading(false)
        })
    },[id, navigate])


    if (loading) {
        return <Preloader/>
    }
    if (error) {
        return (
            <div className="center red-text">
                <h5>{error}</h5>
                <button
                
                className="btn waves-effect waves-light-blue"
                onClick={() => navigate("/")}
                >Go back home</button>
            </div>
        )
    }
    if (!movie) {
        return null;
    }
    return (
        <div className="section">
            <button
            className="btn waves-effect waves-light-blue"
            onClick={() => navigate(-1)}
            ><i className="material-icons left">arrow_back</i> Back
            </button>
            <div className="row">
                <div className="col s12 m4">
                    <div className="card">
                        <div className="card-image">
                            <img src={
                                movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"
                                }
                                 alt={movie.Title || "MoviePoster"}
                                 onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/300x450?text=Poster+Error"
                                 }} />
                        </div>
                    </div>
                </div>
                <div className="col s12 m8">
                    <div className="card-panel">
                        <h4>{movie.Title || "No title"} ({movie.Year || "Unknown year"}) </h4>
                        <div className="divider"></div>
                        <div className="section">
                            {movie.Rated && (
                                <p>
                                    <strong>Rated: </strong> {movie.Rated}
                                </p>
                            )}
                            {movie.Runtime && (
                                <p>
                                    <strong>Runtime: </strong> {movie.Runtime}
                                </p>
                            )}
                            {movie.Genre && (
                                <p>
                                    <strong>Genre: </strong> {movie.Genre}
                                </p>
                            )}
                            {movie.Released && (
                                <p>
                                    <strong>Released: </strong> {movie.Released}
                                </p>
                            )}
                        </div>
                        <div className="divider"></div>
                        {movie.Plot && (
                            <>
                            <div className="section">
                                <h5>Plot</h5>
                                <p>{movie.Plot}</p>
                            </div>
                            <div className="divider"></div>
                            </>
                        )}
                        <div className="section">
                            <h5>Rating</h5>
                            <ul className="collection">
                                {
                                    movie.Rating?.map((rating, index) => {
                                        <li key={index} className="collection-item">
                                            <strong>{rating.Source}:</strong> {rating.Value}
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}