
import React from "react";
import { Movies } from "../components/Movies.jsx"
import { Search } from "../components/search.jsx";
import { Preloader} from "../components/preloader.jsx";

class MovieGrid extends React.Component{
    state = {
        movies:[],
        loading: true,
    };
    componentDidMount() {
        fetch("https://www.omdbapi.com/?apikey=b0887c9e&s=matrix")
        .then((response) => response.json())
        .then((data) => this.setState({movies: data.Search, loading: false }))
    }

    searchMovies = (str, type = "all" ) => {
        this.setState({ loading: true });
        fetch(`https://www.omdbapi.com/?apikey=b0887c9e&s=${str}${type !== "all" ? `&type=${type}` : "" }`)
        .then((response) => response.json())
        .then((data) => this.setState({ movies: data.Search, loading: false}));
    }

    render() {
        const { movies, loading } = this.state;
        return ( <main className="container content ">
            <Search searchMovies={this.searchMovies}/>
            {loading ? <Preloader /> : <Movies movies={this.state.movies}/>}
        </main>
        )
    }
    
}
export {MovieGrid};