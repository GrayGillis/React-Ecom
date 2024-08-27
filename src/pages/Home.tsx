import { Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <div>
        <Nav.Link to='/store' as={NavLink}>Link to Store</Nav.Link>
        <Nav.Link to='/about' as={NavLink}>Link to About</Nav.Link>
      </div>
    </>
  )
}

export default Home