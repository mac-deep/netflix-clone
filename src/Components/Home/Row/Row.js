import React from "react";
import axios from "../../../axios";
import { useState, useEffect } from "react";
import "./Row.css";
import { Link } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    setShow(true);
  }, [fetchUrl]);

  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {movies.map((movie) => (
            <div key={movie.id}>
              {show && (
                <Link to={`/movie/${movie.id}`} className="row__link">
                  <img
                    className="row__poster"
                    src={`${base_url}${movie.poster_path}`}
                    alt={movie.name}
                  />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Row;
