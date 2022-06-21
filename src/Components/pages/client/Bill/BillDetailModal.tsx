import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import BillApi from "../../../../api/cart/BillApi";
import productApi from "../../../../api/product/productApi";
import { moneyFormater } from "../../../../utils/moneyFormater";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import styles from "./style.module.css";
import "./style.scss";
interface Props {
  closeModal: () => void;
  _id: string;
}

const BillDetailModal = (props: Props) => {
  const { closeModal, _id } = props;
  const { handleSubmit, reset, register } = useForm();
  const [listBillDetail, setListBillDetail] = useState<any>({});

  React.useEffect(() => {
    (async () => {
      const res = await BillApi.read({ _id: _id });
      console.log("res?.data?.data", res?.data?.data);
      setListBillDetail(res?.data?.data);
    })();
  }, [_id]);
  listBillDetail?.products?.map((item: any, index: number) => {
    item.product.colors.map((i: any, j: number) => {
      if (item.color === i.color) item.img_color = i.image_url;
    });
  });
  return (
    <div className={`${styles.orderDetail}`}>
      <div className={`${styles.headerOrderDetail}`}>
        <h3>Đơn hàng</h3>
      </div>
      <div className={`${styles.bodyOrderDetail}`}>
        {listBillDetail?.products?.length !== 0 ? (
          listBillDetail?.products?.map((item: any, i: number) => (
            <div className="card mb-3" key={i}>
              <div className="row g-0">
                <div
                  className="col-md-5"
                  style={{ height: "300px", width: "300px" }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    src={item.img_color}
                    className="img-fluid rounded-start "
                    alt="..."
                  />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <h5 className="card-title">{item?.product.name}</h5>
                    <p className="card-text">{`Màu : ${item.color}`}</p>
                    <p className="card-text">{`Số lượng : ${item.quantity}`}</p>
                    <p className="card-text">{`Giá : ${moneyFormater(
                      item.price
                    )}`}</p>
                    <p className="card-text">{`Giảm giá : ${moneyFormater(
                      item.sale
                    )}`}</p>
                    {listBillDetail?.status === "Done" ? (
                      <RatingForm _id={item.product._id} />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

const RatingForm = ({ _id }: { _id: string }) => {
  const [rating, setRating] = useState(100);

  const arr = [
    "rất tệ",
    "tệ",
    "khá tệ",
    "kém",
    "trung bình",
    "khá tốt",
    "tốt",
    "rất tốt",
    "tuyệt",
    "quá tuyệt",
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const submit = async (data: any, e: any) => {
    e.preventDefault();

    data.star = rating / 20;
    console.log(data);
    const Arr = [data];
    const result = await productApi.rate({
      _id: _id,
      rate: data.star,
      message: data.message,
    });
    if (result.status === 200) {
      notifySuccess("Đánh giá thành công");
      reset();
    } else {
      notifyError("Đánh giá thất bại, sản phẩm đã được đánh giá");
    }
  };

  const handleRating = (rate: number) => {
    setRating(rate);
    // other logic
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(submit)}>
        <div>Đánh giá</div>
        <Rating
          initialValue={rating}
          onClick={handleRating}
          ratingValue={rating} /* Available Props */
          allowHalfIcon
          tooltipArray={arr}
          showTooltip
        />
        <p></p>
        <div className="form-group">
          <textarea
            defaultValue=""
            {...register("message")}
            className="form-control"
            id="exampleFormControlTextarea1"
            style={{ width: "300px" }}
            placeholder="Nhận xét"
          ></textarea>
        </div>
        <button
          className="btn btn-sm btn-primary"
          style={{ height: "50px", alignItems: "center" }}
        >
          Đánh giá
        </button>
      </form>
    </>
  );
};

export default BillDetailModal;
