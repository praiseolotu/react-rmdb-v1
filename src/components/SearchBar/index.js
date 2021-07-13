import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Wrapper, Content } from "./SearchBar.styles";
import searchIcons from "../../images/search-icon.svg";

const SearchBar = ({ setSearchTerm }) => {
  const [state, setState] = useState("");

  const initial = useRef(true);
  // useRef is used to manipulate DOM element in React
  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);
    // clear timeout

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  return (
    <Wrapper>
      <Content>
        <img src={searchIcons} alt="search-icon" />
        <input
          type="text"
          placeholder="search movie"
          onChange={(event) => setState(event.currentTarget.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  );
};

SearchBar.propTypes = {
  callback: PropTypes.func,
};

export default SearchBar;
