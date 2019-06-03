import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farFaHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasFaHeart } from "@fortawesome/free-solid-svg-icons";

const Heart = props =>
  props.checkfav.find(i => i.id === props.movie.id) === undefined ? (
    <FontAwesomeIcon
      className="heartIcon"
      icon={farFaHeart}
      color="red"
      onClick={props.onClick}
    />
  ) : (
    <FontAwesomeIcon
      className="heartIcon"
      icon={fasFaHeart}
      color="red"
      onClick={props.onClick}
    />
  );

export default Heart;
