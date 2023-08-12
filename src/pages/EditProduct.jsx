/* ---------------------------------- React --------------------------------- */
import { useEffect, useState } from "react";

/* --------------------------------- Router --------------------------------- */
import { useNavigate, useParams } from "react-router-dom";

/* ------------------------- React Hook Form && Yup ------------------------- */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

/* ---------------------------------- Axios --------------------------------- */
import axios from "axios";

/* -------------------------------- Component ------------------------------- */
import Loader from "../components/Loader";

const EditProduct = () => {
  /* ------------------------------- Local State ------------------------------ */
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const { productId } = useParams();

  /* -------------------------------- Navigate -------------------------------- */
  const navigate = useNavigate();

  /* -------------------------------- Get Data -------------------------------- */
  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      await axios
        .get(`http://localhost:5000/api/products/${productId}`)
        .then((res) => {
          if (res.status === 200) {
            setData(res.data);
            setLoader(false);
          }
        })
        .catch((err) => {
          navigate("/err");
          setLoader(true);
        });
    };
    getData();
  }, [navigate, productId]);

  /* --------------------------------- Schema --------------------------------- */
  const ProductSchema = object({
    name: string().required().trim(),
    details: string().required().trim(),
    price: string().required().trim(),
  });

  /* --------------------------- // React Hook Form --------------------------- */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProductSchema),
    values: {
      name: data.name,
      details: data.details,
      price: data.price,
    },
  });

  /* ------------------------------ Select Image ------------------------------ */
  const handleImg = (e) => {
    let file = e.target.files[0];
    setImage(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setPreview(reader.result);
    };
    reader.onerror = function (error) {
      console.log(error);
    };
  };

  /* --------------------------- Edit Product --------------------------- */

  const onSubmit = async (data) => {
    const body = new FormData();
    body.append("name", data.name);
    body.append("details", data.details);
    body.append("price", data.price);
    body.append("productImage", image);

    await axios
      .put(`${process.env.REACT_APP_ALL_PRODUCT}/${productId}`, body)
      .then((res) => navigate("/all-product"))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="edit-product">
      {loader ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            <form
              data-aos="fade-up"
              data-aos-duration="900"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="inp"
                  defaultValue={data.name}
                  {...register("name")}
                />
                {errors.name && (
                  <div className="error-message">{errors.name.message}</div>
                )}
              </div>
              <div className="form-group">
                <label>Detail</label>
                <textarea
                  name="details"
                  rows="5"
                  cols="33"
                  className="inp"
                  defaultValue={data.details}
                  {...register("details")}
                ></textarea>
                {errors.details && (
                  <div className="error-message">{errors.details.message}</div>
                )}
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  className="inp"
                  defaultValue={data.price}
                  {...register("price")}
                />
                {errors.price && (
                  <div className="error-message">{errors.price.message}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="profileImage">Upload image</label>
                <input
                  type="file"
                  name="profileImage"
                  className="inp"
                  onChange={handleImg}
                />
                {preview ? (
                  <div className="previewImage">
                    <img src={preview} alt="old_img" />
                  </div>
                ) : (
                  <div className="previewImage">
                    {data.productImage && (
                      <img
                        src={`${process.env.REACT_APP_CAR_IMG}${data.productImage}`}
                        alt="new_img"
                      />
                    )}
                  </div>
                )}
              </div>
              <button type="submit" className="btn">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditProduct;
