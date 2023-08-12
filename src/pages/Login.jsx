/* ---------------------------------- React --------------------------------- */
import { useContext } from "react";

/* --------------------------------- Router --------------------------------- */
import { useNavigate } from "react-router-dom";

/* ------------------------- React Hook Form && Yup ------------------------- */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

/* --------------------------------- Context -------------------------------- */
import { Auth } from "../utils/Auth";

const Login = () => {
  /* --------------------------------- Context -------------------------------- */
  const { setToken } = useContext(Auth);
  /* -------------------------------- Navigate -------------------------------- */
  const navigate = useNavigate();

  /* --------------------------------- Schema --------------------------------- */
  const registerSchema = object({
    email: string().required().trim().email(),
    password: string().required().trim().min(8).max(18),
  });

  /* ----------------------------- React Hook Form ---------------------------- */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  /* --------------------------------- Confirm -------------------------------- */
  const onSubmit = (data) => {
    navigate("/");
    setToken(true);
  };
  return (
    <section className="login">
      <div className="container">
        <div className="row">
          <form
            id="registration-form"
            data-aos="fade-up"
            data-aos-duration="900"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="inp"
                {...register("email")}
              />
              {errors.email && (
                <div className="error-message">{errors.email.message}</div>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="inp"
                {...register("password")}
              />
              {errors.password && (
                <div className="error-message">{errors.password.message}</div>
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

export default Login;
