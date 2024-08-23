import { Button, Col, Container, Row, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from '../data/items.json'
import { formatCurrency } from "../util/formatCurrency"

type CartItemProps = {
    id: number
    quantity: number
}

const CartItem = ({id, quantity}: CartItemProps) => {
    const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
    const item = storeItems.find(i => i.id === id);
    if (item == null) return null;

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <Container className='mb-4'>
                <Row md={2} xs={1} lg={3} className='mb-1 g-3'>
                    <Col style={{width: '45%'}}>
                        <img src={item.imgUrl} style={{ width: '125px', height: '75px', objectFit: 'cover'}} />
                    </Col>
                    <Col style={{width: '30%'}}>
                        <div className="me-auto w-100">
                            <div>
                                {item.name} 
                            </div>
                            <div>
                                {quantity > 1 && <span className="text-muted" style={{fontSize: '.65rem'}}>x{quantity}</span>}
                            </div>
                            <div className="text-muted" style={{fontSize: '.75rem'}}>
                                {formatCurrency(item.price)}
                            </div>
                        </div>
                    </Col>
                    <Col style={{width: '25%'}}>
                        <div className="w-100">{formatCurrency(item.price * quantity)}</div>
                    </Col>
                </Row>
                
                <Row sm={1} lg={3} >
                    <Col>
                        <Button className="w-100" size="sm" variant="success" onClick={() => increaseCartQuantity(item.id)} color="blue">
                            +
                        </Button>
                    </Col>
                    <Col>
                        <Button className="w-100" size="sm" variant="warning" onClick={() => decreaseCartQuantity(item.id)}>
                            -
                        </Button>
                    </Col>
                    <Col>
                        <Button className="w-100" size="sm" variant="danger" onClick={() => removeFromCart(item.id)}>
                            &times;
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Stack>
    )
}

export default CartItem