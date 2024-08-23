import { Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <div>
        <Nav.Link to='/store' as={NavLink}>Store</Nav.Link>
        <Nav.Link to='/about' as={NavLink}>About</Nav.Link>
      </div>
    </>
  )
}

export default Home