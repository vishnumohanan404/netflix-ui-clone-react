import React, { useEffect, useState } from "react";
import axios from "../../axios";
import "./RowPost.css";
import {  imageUrl } from "../../constants/constants";

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        console.log(response, "row post");
        setMovies(response.data.results);
      })
      .catch((err) => {
        console.log("err");
      });
  }, []);
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((movie) => (
          <img
            className={props.isSmall ? "smallPoster":"poster"}
            src={`${imageUrl+ movie.backdrop_path}`}
            alt="poster"
          />
        ))}
      </div>
    </div>
  );
}

export default RowPost;
