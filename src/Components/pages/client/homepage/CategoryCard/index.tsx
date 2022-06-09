import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ICategory } from "../../../../../model/category.model";
import "./style.css";

const CategoryCard = (props: ICategory) => {
  const { _id, name, image_url, products_length } = props;
  return (
    <div className="col-lg-3 col-md-6 pb-1">
      <div className="card product-item border-0 mb-4">
        <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
          <p className="text-right">{products_length} Products</p>
          <Link to={`/product/${name}`}>
            <img
              className="img-fluid h-full w-full object-contain"
              src={image_url}
              alt=""
            />
          </Link>
        </div>
        <div className="card-body border-left border-right border-bottom text-center p-0 pt-4 pb-3">
          <h6 className="text-truncate mb-3">{name}</h6>
        </div>
      </div>
    </div>
  );
};
export default React.memo(CategoryCard);
