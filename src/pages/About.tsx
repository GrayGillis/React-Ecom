import { Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const About = () => {
  return (
    <>
      <h1>About</h1>
      <Nav.Link to='/store' as={NavLink}>Store</Nav.Link>
      <p>This web app was created using React, TypeScript, and Bootstrap. This is an ecommerce store that displays a list of items for the user to add to cart, remove from cart, and checkout. The quantity and price of the items will be updated based on the user's actions. After going to the Shopping Cart slideout panel, the user can select the Checkout button and be taken to the Checkout modal to complete the process.</p>
    </>
  )
}

export default About