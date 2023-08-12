/* ---------------------------------- React --------------------------------- */
import { useState } from "react";

/* --------------------------------- Router --------------------------------- */
import { useNavigate } from "react-router-dom";

/* ------------------------- React Hook Form && Yup ------------------------- */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mixed, object, string } from "yup";

/* ---------------------------------- Axios --------------------------------- */
import axios from "axios";
const CreateProduct = () => {
  /* ------------------------------- Local State ------------------------------ */
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);

  /* -------------------------------- Navigate -------------------------------- */
  const navigate = useNavigate();

  /* --------------------------------- Schema --------------------------------- */
  const ProductSchema = object({
    name: string().required().trim(),
    details: string().required().trim(),
    price: string()
    .required()
    .trim()
    .test("numeric", "Price must be a numeric value", (value) => {
      return /^[0-9]+$/.test(value);
    }),
    image: mixed().test("fileRequired", "photo is required", (value) => {
      if (value.length > 0) {
        return true;
      }
      return false;
    }),
  });
  /* --------------------------- // React Hook Form --------------------------- */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ProductSchema) });

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
  /* --------------------------- Create New Product --------------------------- */
  const onSubmit = async (data) => {
    const body = new FormData();
    body.append("name", data.name);
    body.append("details", data.details);
    body.append("price", data.price);
    body.append("productImage", image);
    try {
      await axios
        .post(process.env.REACT_APP_ALL_PRODUCT, body)
        .then((res) => console.log(res));
      navigate("/all-product");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <section className="create-product">
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
                {...register("price")}
              />
              {errors.price && (
                <div className="error-message">{errors.price.message}</div>
              )}
            </div>
            <div className="form-group">
              <label>Upload image</label>
              <input
                type="file"
                name="image"
                className="inp"
                {...register("image")}
                onChange={handleImg}
              />

              {preview ? (
                <div className="previewImage">
                  <img src={preview} alt="uploaded-img" />
                </div>
              ) : (
                errors.image && (
                  <div className="error-message">{errors.image.message}</div>
                )
              )}
            </div>
            <button type="submit" className="btn">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;
