import React from "react";
import "./style.scss";

export const LoadingLMS = (props: { loading: boolean }) => {
  const { loading } = props;
  return (
    <React.Fragment>
      {loading && (
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
      )}
    </React.Fragment>
  );
};
