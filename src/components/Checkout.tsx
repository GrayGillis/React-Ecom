import { Button, Form, Modal } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'

type CheckoutProps = {
    isOpen: boolean
}
const Checkout = ({ isOpen }: CheckoutProps) => {
    const { closeCheckout, closeCart } = useShoppingCart()

    const handleSubmit = () => {
        closeCheckout()
        closeCart()
    }

    return (
        <Modal show={isOpen} onHide={closeCheckout}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Checkout
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='mb-4'>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name" />
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="phone" placeholder="Enter phone nuumber" />
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" placeholder="Enter street" />
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter city" />
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter postal code" />
                </Form>
                <div className="d-flex justify-content-between">
                    <Button variant='danger' onClick={closeCheckout}>Close</Button>
                    <Button variant='success' onClick={handleSubmit}>Submit</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Checkout