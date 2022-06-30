import React from "react";
import { Link } from "react-router-dom";
import Cart from "../../../Pages/client/cart/Cart";
import useAuth from "../../../store/auth";
import useCart from "../../../store/cart";
import useLocalCart from "../../../store/localCart";
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
  const [stateLocalCart, actionLocalCart] = useLocalCart();

  const [stateAuth, actionAuth] = useAuth();

  React.useEffect(() => {
    (async () => {
      if (stateAuth.isLoggedIn) await actionAuth.getUserAsync();
    })();
  }, [click]);
  const handleAddtoCart = async (_id: any) => {
    let added: number = 0;
    if (stateAuth.isLoggedIn) {
      stateCart.data.filter((item, index) => {
        if (item.product._id === _id && item.color === product.colors[0].color)
          added = item.quantity;
      });
    } else {
      stateLocalCart?.data?.map((item) => {
        if (item.product === _id && item.color === product.colors[0].color) {
          added = item.quantity;
        }
      });
    }

    if (product.colors[0].quantity > added) {
      if (stateAuth.isLoggedIn) {
        const res = await actionCart.PushCart({
          _id: _id,
          quantity: 1,
          color: product.colors[0].color,
        });
        if (res) {
          setClick(click + 1);
          notifySuccess("Thêm vào giỏ hàng thành công !");
        } else notifyError("Thêm vào giỏ hàng thất bại, vui lòng thử lại !");
      } else {
        let cart: any = [];
        if (stateLocalCart.data) {
          let check = true;
          cart = stateLocalCart.data.map((item) => {
            if (
              item.product === _id &&
              item.color === product.colors[0].color
            ) {
              item.quantity = item.quantity + 1;
              check = false;
            }
            return item;
          });
          check &&
            cart.push({
              product: _id,
              quantity: 1,
              color: product.colors[0].color,
            });
        } else {
          cart = [
            {
              product: _id,
              quantity: 1,
              color: product.colors[0].color,
            },
          ];
        }
        actionLocalCart.PushLocalCart({
          data: cart,
          count: stateLocalCart.count + 1,
        });
        notifySuccess("Thêm vào giỏ hàng thành công !");
      }
    } else notifyError("Số lượng sản phẩm còn lại không đủ !");
  };

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
      <div className="card product-item border-0 mb-4">
        <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
          <p className="text-right">{product?.colors[0]?.quantity} Sản phẩm</p>
          <Link to={`/products/${product.category}/${product._id}`}>
            <img
              className="img-fluid h-full w-full object-contain"
              src={
                product.colors.length !== 0
                  ? product?.colors[0]?.image_url
                  : "http://home.deltacorp.vn/wp-content/uploads/2017/05/coming-soon-banner.png"
              }
              alt=""
            />
          </Link>
        </div>
        <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
          <h6 className="text-truncate mb-3">
            {product?.name +
              " " +
              (product?.colors.length !== 0 ? product.colors[0].color : "")}
          </h6>
          <h6>
            {moneyFormater((product?.price * (100 - product?.sale)) / 100)}
          </h6>
          {product?.sale ? (
            <h6 className="text-muted ml-2">
              <del>{moneyFormater(product?.price)}</del>
            </h6>
          ) : (
            <div style={{ paddingBottom: "27px" }}></div>
          )}
        </div>
        <div className="card-footer d-flex justify-content-between bg-light border">
          <Link
            to={
              product.colors.length !== 0
                ? `/products/${product?.category}/${product?._id}`
                : "/products"
            }
            className="btn btn-sm text-dark p-0"
          >
            <i className="fas fa-eye text-primary mr-1"></i>Xem
          </Link>
          <a
            className="btn btn-sm text-dark p-0"
            onClick={() =>
              product.colors.length !== 0 && handleAddtoCart(product?._id)
            }
          >
            <i className="fas fa-shopping-cart text-primary mr-1"></i>
            {product.colors.length !== 0 ? "Thêm" : "Sắp về"}
          </a>
        </div>
      </div>
    </div>
  );
};
