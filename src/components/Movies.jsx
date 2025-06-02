
 import { Movie } from "./Movie";
import { Link } from "react-router"

 export function Movies(props) {
    const { movies = [] } = props;
    return(
        <div className="movies">
            {movies.length ? (
                
                    movies.map((movie) => (
                        <Link to={`/movie/${movie.imdbID}`}>
                            <Movie key={movie.imdbID} {...movie}/>
                        </Link>
                    )))
             : (
                <h4>└(・。・)┘</h4>
            )
            }
        </div>
    )
}

