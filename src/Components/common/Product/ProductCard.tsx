import React from "react";
import { Link } from "react-router-dom";
import useCart from "../../../store/cart";
import { moneyFormater } from "../../../utils/moneyFormater";

export const ProductCard = ({
  product,
  setClick,
  click,
}: {
  product: any;
  setClick: React.Dispatch<React.SetStateAction<any>>;
  click: number;
}) => {
  const [stateCart, actionCart] = useCart();

  const handleAddtoCart = async (_id: any) => {
    await actionCart.PushCart({ _id: _id, quantity: 1 });
    console.log("id", _id);
    setClick(click + 1);
  };

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
      <div className="card product-item border-0 mb-4">
        <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
          <p className="text-right">{product.quantity} Products</p>
          <Link to={`/products/${product.category?.name}/${product._id}`}>
            <img
              className="img-fluid h-full w-full object-contain"
              src={product.image_url}
              alt=""
            />
          </Link>
        </div>
        <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
          <h6 className="text-truncate mb-3">{product.name}</h6>
          <h6>{moneyFormater(product.price - product.sale)}</h6>
          {product.sale ? (
            <h6 className="text-muted ml-2">
              <del>{moneyFormater(product.price)}</del>
            </h6>
          ) : (
            ""
          )}
        </div>
        <div className="card-footer d-flex justify-content-between bg-light border">
          <a href="" className="btn btn-sm text-dark p-0">
            <i className="fas fa-eye text-primary mr-1"></i>View Detail
          </a>
          <a
            className="btn btn-sm text-dark p-0"
            onClick={() => handleAddtoCart(product._id)}
          >
            <i className="fas fa-shopping-cart text-primary mr-1"></i>Add To
            Cart
          </a>
        </div>
      </div>
    </div>
  );
};
