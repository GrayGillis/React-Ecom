import React from 'react'
import { Button, Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import CartItem from './CartItem'
import storeItems from '../data/items.json'
import { formatCurrency } from '../util/formatCurrency'

type ShoppingCartProps = {
    isOpen: boolean
}
const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
    const { closeCart, cartItems, openCheckout } = useShoppingCart()
    return (
        <Offcanvas show={isOpen} placement='end' onHide={closeCart}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    Shopping Cart
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total: {formatCurrency(cartItems.reduce((total, cartItem) => {
                            const item = storeItems.find(i => i.id === cartItem.id)
                            return total + (item?.price || 0)* cartItem.quantity
                        }, 0))}
                    </div>
                    <div className='ms-auto'>
                        <Button onClick={openCheckout}>Checkout</Button>
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ShoppingCart