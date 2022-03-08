import './movieDetail.scss';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchAsyncMovieOrShowDetail, getSelectedMovieOrShow, removeSelectedMovieOrShow } from '../../features/movies/movieSlice';

export default function MovieDetail() {
    const { imdbID } = useParams();
    const dispatch = useDispatch();
    const movie = useSelector(getSelectedMovieOrShow);

    useEffect(() => {
        dispatch(fetchAsyncMovieOrShowDetail(imdbID));
        return () => {
            dispatch(removeSelectedMovieOrShow())
        }
    }, [dispatch, imdbID]);

    return (
        <div className="container movieContainer">
            {Object.keys(movie).length === 0 ? (
                <div>...Loading</div>
            ) : (
                <>
                    <div className="left">
                        <div className="movieTitle">{movie.Title}</div>
                        <div className="movieRating">
                            <span>
                                IMDB Rating : {movie.imdbRating}
                            </span>
                            <span>
                                IMDB Votes :{" "}
                                {movie.imdbVotes}
                            </span>
                            <span>
                                Runtime : {movie.Runtime}
                            </span>
                            <span>
                                Year : {movie.Year}
                            </span>
                        </div>
                        <div className="moviePlot">
                            {movie.Plot}
                        </div>
                        <div className="movieInfo">
                            <div>
                                <span>Director</span>
                                <span>{movie.Director}</span>
                            </div>
                            <div>
                                <span>Stars</span>
                                <span>{movie.Actors}</span>
                            </div>
                            <div>
                                <span>Generes</span>
                                <span>{movie.Genre}</span>
                            </div>
                            <div>
                                <span>Languages</span>
                                <span>{movie.Language}</span>
                            </div>
                            <div>
                                <span>Awards</span>
                                <span>{movie.Awards}</span>
                            </div>
                        </div>
                    </div>
                    <div className="right">

                        <img src={movie.Poster} alt="" />
                    </div>
                </>
            )}
        </div>
    );
}
