import { PlayArrow } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    fetchAsyncMovieByTitle,
    getBannerInfo,
} from "../../features/movies/movieSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import cn from 'classnames';
import "./banner.scss";

export default function Banner() {
    const dispatch = useDispatch();
    const bannerInfo = useSelector(getBannerInfo);
    const loaded = !!bannerInfo.Plot;
    const [playerVisible, setPlayerVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchAsyncMovieByTitle("Matrix"));
    }, [dispatch]);

    if (!loaded) {
        return (
            <div className="bannerLoader">
                <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                </Box>
            </div>
        );
    }

    return (
        <div className="banner">
            <div className="info">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/The-matrix-logo.svg/800px-The-matrix-logo.svg.png"
                    alt=""
                />

                <div className="desc">{bannerInfo.Plot}</div>
                <div className="buttons">
                    <button
                        className="play"
                        onClick={() => {
                            setPlayerVisible((prev) => !prev);
                        }}
                    >
                        <PlayArrow />
                        <span>Preview</span>
                    </button>
                </div>
            </div>

            <div className="player">
                <div
                    className={cn({ 'iframe-wrapper': true, visible: playerVisible })}
                    style={{ padding: "77.7% 0 0 0", position: "relative" }}
                >
                    <iframe
                        title="Matrix"
                        src="https://player.vimeo.com/video/485083997?h=57f2c4ec9e&autoplay=1&loop=1&color=33752d&title=0&byline=0&portrait=0"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                        }}
                        frameBorder="0"
                        allow="fullscreen; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
        </div>
    );
}
