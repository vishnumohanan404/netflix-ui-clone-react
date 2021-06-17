import React, { useEffect, useState } from "react";
import axios from "../../axios";
import "./RowPost.css";
import Youtube from 'react-youtube'
import {  imageUrl, API_KEY } from "../../constants/constants";

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [UrlId, setUrlId] = useState('')
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
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovieClick = (id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
        console.log(response.data)
        if(response.data.results.length !==0){
            setUrlId(response.data.results[0])
        }else{
            console.log("Empty array ")
        }
    })
  }
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((movie) => (
          <img
            onClick={()=>handleMovieClick(movie.id)}
            className={props.isSmall ? "smallPoster":"poster"}
            src={`${imageUrl+ movie.backdrop_path}`}
            alt="poster"
          />
        ))}
      </div>
      {UrlId && <Youtube opts={opts} videoId={UrlId.key}/>}
    </div>
  );
}

export default RowPost;
