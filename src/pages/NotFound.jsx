import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="home">
    <div className="row">
      <h1 className="title">
        <span style={{ fontSize: 80 }}>404</span> Page Not Found
      </h1>
      <div className="btn">
        <Link to="/">Go To Home Page</Link>
      </div>
    </div>
  </section>
  )
}

export default NotFound