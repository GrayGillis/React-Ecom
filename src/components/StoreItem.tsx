import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { formatCurrency } from '../util/formatCurrency'
import { useShoppingCart } from '../context/ShoppingCartContext'
type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}
const StoreItem = ({ id, name, price, imgUrl}: StoreItemProps) => {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
    const quantity = getItemQuantity(id);
    return (
        <Card key={id} className='h-100'>
            <Card.Img variant='top' src={imgUrl} height={'200px'} style={{objectFit: 'cover'}} />
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
                    <span className='fs-2'>{name}</span>
                    <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    { quantity === 0 ? (
                        <Button className='w-100' onClick={() => increaseCartQuantity(id)}>+ Add to Cart</Button>
                    ): 
                    <div className='d-flex align-items-center flex-column' style={{gap: '0.5rem'}}>
                        <div className="d-flex align-items-center justify-content-center" style={{gap: '0.5rem'}}>
                            <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                            <div>
                                <span className="fs-3">{quantity}</span> in cart
                            </div>
                            <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                        </div>
                        <Button variant='danger' size='sm' onClick={() => removeFromCart(id)}>Remove</Button>
                    </div>}
                </div>
            </Card.Body>
        </Card>
    )
}

export default StoreItem