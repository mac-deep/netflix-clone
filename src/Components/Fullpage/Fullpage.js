import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Fullpage.css";
import movieTrailer from "movie-trailer";
import Youtube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Fullpage({ match }) {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=72e2851784da5d1c1048009b3becc995`
      );
      const { data } = request;
      setMovie(data);
    }
    fetchData();
  }, [match]);

  //---youtube trailer handle---
  const handleClick = (movie) => {
    setShow(true);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.original_name || movie?.title || movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  //for youtube
  const opts = {
    playerVars: { autoplay: 1 },
  };

  return (
    <div className="fullpage">
      <header
        className="fp"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center",
        }}
      >
        <div className="fp__content">
          <h1 className="fp__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="row-1">
            <div className="fp__date">
              <p>Status: </p>
              <p>{movie.status}</p>
            </div>
            <div className="fp__rate">
              <div className="fp__rateInner">
                <div className="col-1">
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div className="col-2">
                  <p>
                    <span>{movie.vote_average}</span> /10
                  </p>
                  <p>({movie.vote_count})</p>
                </div>
              </div>
            </div>
          </div>
          <div className="fp__buttons">
            <button className="fp__button" onClick={() => handleClick(movie)}>
              Play Trailer
            </button>
          </div>
          <p className="fp__description">{movie.overview}</p>
        </div>
        <div className="fp--fadebottom" />
      </header>
      <div className={show ? `fp__trailer` : null}>
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Fullpage;
