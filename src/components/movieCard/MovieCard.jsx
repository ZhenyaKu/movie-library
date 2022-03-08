import './movieCard.scss';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {

    return (
        <div className="card">
            <Link to={`/movie/${movie.imdbID}`}>
                <div className="cardInner">
                    <div className="cardTop">
                        <img src={movie.Poster} alt="" />
                    </div>
                    <div className="cardBottom">
                        <div className="cardInfo">
                            <h4>{movie.Title}</h4>
                            <p>{movie.Year}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
