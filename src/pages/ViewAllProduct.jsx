/* ---------------------------------- React --------------------------------- */
import { useEffect, useState } from "react";

/* --------------------------------- Router --------------------------------- */
import { Link, useNavigate } from "react-router-dom";

/* ---------------------------------- Icons --------------------------------- */
import { FaTrash, FaEdit } from "react-icons/fa";

/* ---------------------------------- Axios --------------------------------- */
import axios from "axios";

/* -------------------------------- Component ------------------------------- */
import Loader from "../components/Loader";
import { createRemoveAlert } from "../utils/SweetAlert";

const ViewAllProduct = () => {
  /* ------------------------------- Local State ------------------------------ */
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  /* ------------------------------- NAvigation ------------------------------- */
  const navgate = useNavigate();
  /* -------------------------------- Get All DAta -------------------------------- */
  useEffect(() => {
    const getAllData = async () => {
      setLoader(true);
      await axios
        .get(process.env.REACT_APP_ALL_PRODUCT)
        .then((res) => {
          if (res.status === 200) {
            setData(res.data);
            setLoader(false);
          }
        })
        .catch((err) => {
          setLoader(true);
          navgate("/err");
        });
    };
    getAllData();
  }, [navgate]);

  /* ----------------------------- Remove Product ----------------------------- */
  const removeData = (dataId) => {
   createRemoveAlert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      "Yes, Remove",
      () => {
        const updatedCart = data.filter((item) => item.id !== dataId);
        axios
        .delete(`${process.env.REACT_APP_ALL_PRODUCT}/${dataId}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
        setData(updatedCart);
      }
    );
  };
  /* ----------------------------- Remove All Product ----------------------------- */
  const removeAllData = () => {
    createRemoveAlert(
      "Remove Item",
      "Are you sure you want to remove All Product from your cart?",
      "Yes, Remove",
      () => {
         axios
        .delete(process.env.REACT_APP_ALL_PRODUCT)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
        setData([]);
      }
    );
  };

  return (
    <section className="allCars">
      {loader && <Loader />}
      <div className="container">
        <div className="row">
          <h2 className="title">All Cars List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Product Image</th>
                <th>Car Name</th>
                <th>Product Details</th>
                <th>Product Price</th>
                <th>Edit Product</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="productImg">
                    {item.productImage && (
                      <img
                        src={`${process.env.REACT_APP_CAR_IMG}${item.productImage}`}
                        alt={item.name}
                      />
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.details}</td>
                  <td>${item.price}</td>
                  <td className="edit">
                    <Link to={`/edit-product/${item.id}`}>
                      <FaEdit />
                    </Link>
                  </td>
                  <td className="edit">
                    <FaTrash onClick={() => removeData(item.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn" onClick={removeAllData}>
            Remove All Data
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViewAllProduct;
