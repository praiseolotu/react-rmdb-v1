import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
// import styles

import { Content, Wrapper } from "./BreadCrumb.styles";

// Component

const BreadCrumb = ({ movieTitle }) => (
  <Wrapper>
    <Content>
      <Link to="/" style={{ textDecoration: null }}>
        <span>Home</span>
      </Link>
      <span>|</span>
      <span>{movieTitle}</span>
    </Content>
  </Wrapper>
);

BreadCrumb.propTypes = {
  movieTitle: PropTypes.string,
};

export default BreadCrumb;
