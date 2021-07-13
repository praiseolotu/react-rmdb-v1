import React from "react";
// Config files
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

// component

import Grid from "./Grid";
import Spinner from "./Spinner";
import BreadCrumb from "./BreadCrumb";
import Actor from "./Actor";
import { MovieInfoBar } from "./MovieInfoBar";
import { MovieInfo } from "./MovieInfo";
// Hook
import { useMovieFetch } from "../hooks/useMovieFetch";
import { useParams } from "react-router-dom";
// Image
import NoImage from "../images/no_image.jpg";

const Movie = () => {
  // let me grab the url parameter from browser
  const { movieId } = useParams();
  // I dindn't rename mine
  const { state, loading, error } = useMovieFetch(movieId);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;

  return (
    <>
      <BreadCrumb movieTitle={state.original_title} />
      <MovieInfo movie={state} />
      <MovieInfoBar
        time={state.runtime}
        budget={state.budget}
        revenue={state.revenue}
      />
      <Grid header="Actors">
        {state.actors.map((actor) => (
          <Actor
            key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageUrl={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : NoImage
            }
          />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
