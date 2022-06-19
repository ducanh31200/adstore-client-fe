import React from "react";
import { Link } from "react-router-dom";
import useCart from "../../../store/cart";
import { moneyFormater } from "../../../utils/moneyFormater";
import { notifyError, notifySuccess } from "../../../utils/notify";

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

  React.useEffect(() => {
    (async () => {
      await actionCart.GetCart();
    })();
  }, [click]);
  const handleAddtoCart = async (_id: any) => {
    let added: number = 0;
    console.log("product", product);
    let item_quantity = stateCart.data.filter((item, index) => {
      if (item.product._id === _id) added = item.quantity;
    });
    if (item_quantity) {
      added = 0;
    }
    if (product.colors[0].quantity > added) {
      const res = await actionCart.PushCart({
        _id: _id,
        quantity: 1,
        color: product.colors[0].color,
      });
      if (res) {
        setClick(click + 1);
        notifySuccess("Thêm vào giỏ hàng thành công !");
      } else notifyError("Thêm vào giỏ hàng thất bại, vui lòng thử lại !");
    } else notifyError("Số lượng sản phẩm còn lại không đủ !");
  };

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
      <div className="card product-item border-0 mb-4">
        <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
          <p className="text-right">{product.colors[0].quantity} Products</p>
          <Link to={`/products/${product.category}/${product._id}`}>
            <img
              className="img-fluid h-full w-full object-contain"
              src={product.colors[0].image_url}
              alt=""
            />
          </Link>
        </div>
        <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
          <h6 className="text-truncate mb-3">
            {product.name + " " + product.colors[0].color}
          </h6>
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
          <Link
            to={`/products/${product.category}/${product._id}`}
            className="btn btn-sm text-dark p-0"
          >
            <i className="fas fa-eye text-primary mr-1"></i>View Detail
          </Link>
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
