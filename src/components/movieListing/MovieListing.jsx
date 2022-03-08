import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Settings } from "../../common/settings";
import "./movieListing.scss";
import { getAllMovies, getAllShows } from "../../features/movies/movieSlice";
import MovieCard from "../movieCard/MovieCard";

export default function MovieListing() {
    const movies = useSelector(getAllMovies);
    const shows = useSelector(getAllShows);
    const hasMovies = movies.Response === "True";
    const hasShows = shows.Response === "True";
    const renderMovies = movies?.Search?.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
    ));
    const renderShows = shows?.Search?.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
    ));

    return (
        <div className="container movieWrapper">
            <div className="movieList">
                <h2>Movies</h2>
                <div className="moviesContainer">
                    <Slider {...Settings}>
                        {hasMovies ? (
                            renderMovies
                        ) : (
                            <div className="movieError">
                                <h3>{movies.Error}</h3>
                            </div>
                        )}
                    </Slider>
                </div>
            </div>
            <div className="showList">
                <h2>Shows</h2>
                <div className="moviesContainer">
                    <Slider {...Settings}>
                        {hasShows ? (
                            renderShows
                        ) : (
                            <div className="showsError">
                                <h3>{shows.Error}</h3>
                            </div>
                        )}
                    </Slider>
                </div>
            </div>
        </div>
    );
}
