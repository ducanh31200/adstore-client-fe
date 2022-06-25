import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Carousel = ({
  carousel_items,
}: {
  carousel_items: Array<any>;
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const navigate = useNavigate();
  const onClick = (cate: string, _id: string) => {
    navigate(`/products/${cate}/${_id}`);
  };
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
            onClick={() => onClick(item.category, item._id)}
          >
            <img className="img-fluid" src={item.image_url} alt="Image" />

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
