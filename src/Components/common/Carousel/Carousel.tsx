import React from "react";

export const Carousel = ({
  carousel_items,
}: {
  carousel_items: Array<any>;
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  return (
    <div
      id="header-carousel"
      className="carousel slide"
      data-ride="carousel"
      data-interval="2000"
    >
      <div className="carousel-inner">
        {carousel_items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${
              currentSlide === index ? "active" : ""
            }`}
            style={{ height: "410px" }}
          >
            <img className="img-fluid" src={item.image} alt="Image" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: "720px" }}></div>
            </div>
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href="#header-carousel"
        data-slide="prev"
      >
        <div className="btn btn-dark" style={{ height: "40px", width: "45px" }}>
          <span className="carousel-control-prev-icon mb-n2"></span>
        </div>
      </a>
      <a
        className="carousel-control-next"
        href="#header-carousel"
        data-slide="next"
      >
        <div className="btn btn-dark" style={{ height: "40px", width: "45px" }}>
          <span className="carousel-control-next-icon mb-n2"></span>
        </div>
      </a>
    </div>
  );
};
