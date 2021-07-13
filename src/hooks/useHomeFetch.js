import { useState, useEffect } from "react";
// API
import API from "../API";

//Helper
import { isPersistedState } from "../helpers";
const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  // when searchTerm is empty , it defaults to true, when searchTerm is populated, it becomes false
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // function to fetch movies
  const fetchMovies = async (page, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);
      const movies = await API.fetchMovies(searchTerm, page);
      console.log(movies);
      setState((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };
  // initial render and fetch just 1 page first || search
  useEffect(() => {
    if (!searchTerm) {
      const sessionState = isPersistedState("homeState");

      if (sessionState) {
        console.log("Grabbing from sessionStorage");
        setState(sessionState);
        return;
      }
    }
    console.log("Grabbing from API");
    // when we search, we want to clear out the previous state
    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);
  // our goal is to ensure that we check and
  // write to sessionStorage on initial render and not when we are searching
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm);
    // after fetching movies we revert back to false
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  // Write to sessionStorage
  useEffect(() => {
    if (!searchTerm) sessionStorage.setItem("homeState", JSON.stringify(state));
  }, [searchTerm, state]);

  //   every custom hook must return something

  return { state, error, loading, setSearchTerm, searchTerm, setIsLoadingMore };
};
