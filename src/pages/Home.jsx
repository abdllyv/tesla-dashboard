import { Link } from "react-router-dom";
const Home = () => {
  return (
    <main>
      <section className="home">
        <div className="row">
          <h1 className="title">
            Welcome To The <span>Dashboard </span>
          </h1>
          <div className="btn">
            <Link to="/all-product">Go To All Products Page</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
