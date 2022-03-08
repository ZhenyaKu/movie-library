import "./home.scss";
import MovieListing from "../movieListing/MovieListing";
import Banner from "../banner/Banner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    fetchAsyncMovies,
    fetchAsyncShows,
} from "../../features/movies/movieSlice";

export default function Home() {
    const dispatch = useDispatch();
    const movieText = "Harry";
    const showText = "Friends";
    useEffect(() => {
        const fetchMovies = async () => {
            dispatch(fetchAsyncMovies(movieText));
            dispatch(fetchAsyncShows(showText));
        };

        fetchMovies();
    }, [dispatch]);

    return (
        <div className="home">
            <Banner />
            <MovieListing />
        </div>
    );
}
