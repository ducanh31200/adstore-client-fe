import React from "react";
import "./style.scss";

interface LoadingProps {
  loading: boolean;
}

export const LoadingLMS = (props: LoadingProps) => {
  if (props.loading)
    return (
      <div className="loadingContainer">
        <span className="loader">
          <span className="loader-text">A</span>
          <span className="loader-inner"></span>
        </span>
        <span className="loader">
          <span className="loader-text">D</span>
          <span className="loader-inner"></span>
        </span>
        <span className="loader">
          <span className="loader-text">S</span>
          <span className="loader-inner"></span>
        </span>
        <span className="loader">
          <span className="loader-text">t</span>
          <span className="loader-inner"></span>
        </span>
        <span className="loader">
          <span className="loader-text">o</span>
          <span className="loader-inner"></span>
        </span>
        <span className="loader">
          <span className="loader-text">r</span>
          <span className="loader-inner"></span>
        </span>
        <span className="loader">
          <span className="loader-text">e</span>
          <span className="loader-inner"></span>
        </span>
      </div>
    );
  return <></>;
};
