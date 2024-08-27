import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { MouseEvent, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import Spinner from 'react-bootstrap/Spinner';

type CheckoutProps = {
    isOpen: boolean
}
const Checkout = ({ isOpen }: CheckoutProps) => {
    const { closeCheckout, closeCart, clearCart } = useShoppingCart()
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

    const handleReset = () => {
        clearCart();
        setValidated(false);
    };

    const handleSubmit = (event: MouseEvent) => {
        event.preventDefault()
        setValidated(true)
        if (checkData()) {
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
                handleReset()
                closeCheckout()
                closeCart()
            }, 2500)
        }
    }

    const handleInputChange = (identifier: string, value: string) => {
        setCheckoutData(prevValues => ({
            ...prevValues,
            [identifier]: value
        }))
    }

    const handleCloseCheckout = () => {
        setCheckoutData({
            name: '',
            email: '',
            phone: '',
            street: '',
            city: '',
            postal: ''
        })
        closeCheckout()
    }

    return (
        <>
            <Modal show={isLoading}>
                <Card >
                    <Card.Body className='d-flex justify-content-center align-items-center g-y-2'>
                        <div>
                            <Spinner animation="border" variant="primary" style={{
                                height: '50px',
                                width: '50px'
                            }}/>
                            <h6>Loading...</h6>
                        </div>
                    </Card.Body>
                </Card>
            </Modal>
            <Modal show={isOpen} onHide={handleCloseCheckout}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Checkout
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='mb-4' noValidate validated={validated}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter full name" 
                                        value={checkoutData.name} 
                                        onChange={(e) => handleInputChange('name', e.target.value)} 
                                        required
                                        pattern='^[a-zA-Z]+$'
                                        isInvalid={validated && !(/^[a-zA-Z]+$/.test(checkoutData.name))} 
                                        disabled={isLoading}
                                        />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid full name.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid">
                                        Looks good!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email"  
                                    value={checkoutData.email} 
                                    onChange={(e) => handleInputChange('email', e.target.value)} 
                                    required 
                                    pattern='^\S+@\S+\.\S+$'
                                    isInvalid={validated && !/^\S+@\S+\.\S+$/.test(checkoutData.email)}
                                    disabled={isLoading}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid email.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid">
                                        Looks good!
                                    </Form.Control.Feedback>
                                </Form.Group>       
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="phone" placeholder="Enter phone number" value={checkoutData.phone} 
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                pattern="^\d{10}$" 
                                isInvalid={validated && !/^\d{10}$/.test(checkoutData.phone) }
                                required
                                disabled={isLoading}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    Please a valid phone number.
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                        Looks good!
                                    </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Street</Form.Label>
                                <Form.Control type="text" placeholder="Enter street"  
                                value={checkoutData.street} 
                                onChange={(e) => handleInputChange('street', e.target.value)}
                                required
                                isInvalid={validated && !/^[a-zA-Z0-9]+$/.test(checkoutData.street)}
                                disabled={isLoading}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    Please a valid street address.
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    Looks good!
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                        </Row>          
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" placeholder="Enter city" 
                                    value={checkoutData.city} 
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                    required
                                    pattern='^[a-zA-Z]+$'
                                    isInvalid={validated && !/^[a-zA-Z]+$/.test(checkoutData.city)}
                                    disabled={isLoading}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        Please a valid city.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid">
                                        Looks good!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control type="text" placeholder="Enter postal code"
                                    value={checkoutData.postal} 
                                    onChange={(e) => handleInputChange('postal', e.target.value)}
                                    required
                                    pattern="^\d{5}$" 
                                    isInvalid={validated && !/^\d{5}$/.test(checkoutData.postal) && checkoutData.postal.length < 5}
                                    disabled={isLoading}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        Please a valid postal code.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid">
                                        Looks good!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col> 
                        </Row>
                    </Form>
                    <div className="d-flex justify-content-between">
                        <Button variant='danger' onClick={handleCloseCheckout}>Close</Button>
                        <Button variant='success' onClick={(e) => handleSubmit(e)}>Submit</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Checkout