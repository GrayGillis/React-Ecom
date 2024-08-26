import { Button, Form, Modal, Row } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { MouseEvent, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";

type CheckoutProps = {
    isOpen: boolean
}
const Checkout = ({ isOpen }: CheckoutProps) => {
    const { closeCheckout, closeCart } = useShoppingCart()
    const [validated, setValidated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [checkoutData, setCheckoutData] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        postal: ''
    })

    const checkData = () => {
        const flag = /^[a-zA-Z]+$/.test(checkoutData.name) && /^\S+@\S+\.\S+$/.test(checkoutData.email) && (checkoutData.phone.length === 10) && 
        /^[a-zA-Z0-9]+$/.test(checkoutData.street) && 
        /^[a-zA-Z]+$/.test(checkoutData.city) && (checkoutData.postal.length === 5)
        return flag
    }

    const handleSubmit = (event: MouseEvent) => {
        event.preventDefault()
        if (checkData()) {
            //set loading state
            console.log('test')
            setTimeout(() => {
                closeCheckout()
                closeCart()
            }, 2000)
        }
        setValidated(true)
    }

    const handleInputChange = (identifier: string, value: string) => {
        setCheckoutData(prevValues => ({
            ...prevValues,
            [identifier]: value
        }))
    }

    return (
        <Modal show={isOpen} onHide={closeCheckout}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Checkout
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='mb-4' noValidate validated={validated}>
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter full name" 
                                value={checkoutData.name} 
                                onChange={(e) => handleInputChange('name', e.target.value)} 
                                required
                                pattern='^[a-zA-Z]+$'
                                isInvalid={validated && !(/^[a-zA-Z]+$/.test(checkoutData.name))} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid full name.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                                Looks good!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"  
                            value={checkoutData.email} 
                            onChange={(e) => handleInputChange('email', e.target.value)} 
                            required 
                            isInvalid={validated && !/^\S+@\S+\.\S+$/.test(checkoutData.email)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                                Looks good!
                            </Form.Control.Feedback>
                    </Form.Group>       
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="phone" placeholder="Enter phone number" value={checkoutData.phone} 
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        pattern="^\d{10}$" 
                        isInvalid={validated && !/^\d{10}$/.test(checkoutData.phone) }
                        required
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please a valid phone number.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="valid">
                                Looks good!
                            </Form.Control.Feedback>
                    </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group>
                            <Form.Label>Street</Form.Label>
                            <Form.Control type="text" placeholder="Enter street"  
                            value={checkoutData.street} 
                            onChange={(e) => handleInputChange('street', e.target.value)}
                            required
                            isInvalid={validated && !/^[a-zA-Z0-9]+$/.test(checkoutData.street)}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please a valid street address.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                                Looks good!
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="Enter city" 
                            value={checkoutData.city} 
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            required
                            pattern='^[a-zA-Z]+$'
                            isInvalid={validated && !/^[a-zA-Z]+$/.test(checkoutData.city)}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please a valid city.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                                Looks good!
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter postal code"
                            value={checkoutData.postal} 
                            onChange={(e) => handleInputChange('postal', e.target.value)}
                            required
                            pattern="^\d{5}$" 
                            isInvalid={validated && !/^\d{5}$/.test(checkoutData.postal) && checkoutData.postal.length < 5}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please a valid postal code.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                                Looks good!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>          
                </Form>
                <div className="d-flex justify-content-between">
                    <Button variant='danger' onClick={closeCheckout}>Close</Button>
                    <Button variant='success' onClick={(e) => handleSubmit(e)}>Submit</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Checkout