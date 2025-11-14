import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";
import { removeProduct, addProduct, clearProduct, checkoutCart } from "../redux/shoppingCartSlice";
import type { AppDispatch } from "../redux/store";
import type { Product } from "../types";

const ShoppingCartDropdown = () => {
    const [showCart, setShowCart] = useState<boolean>(false);

    // Redux
    const shoppingCartProducts = useSelector((state: RootState) => state.shoppingCart.products);
    const shoppingCartQuantities = useSelector((state: RootState) => state.shoppingCart.quantities);
    const shoppingCartNumberOfItems = useSelector((state: RootState) => state.shoppingCart.numberOfItems);
    const shoppingCartTotal = useSelector((state: RootState) => state.shoppingCart.totalPrice.toFixed(2));
    const displayTotal = parseFloat(shoppingCartTotal) > 0 ? `$${shoppingCartTotal}` : `$0.00`;
    const dispatch = useDispatch<AppDispatch>();
    const handleRemoveProduct = (product: Product) => dispatch(removeProduct(product));
    const handleAddProduct = (product: Product) => dispatch(addProduct(product));
    const handleClearProduct = (product: Product) => dispatch(clearProduct(product));
    const clearCheckoutCart = () => dispatch(checkoutCart());

    const handleCheckoutCart = async () => {
        // Clear cart to simulate checkout process
        clearCheckoutCart();
        // Add order to orders in firestore
        
    };

    return (
        <DropdownButton
            id="dropdown-basic-button"
            variant="warning"
            title={`🛒 ${shoppingCartNumberOfItems}`}
            className="d-flex"
            show={showCart}
            onToggle={() => setShowCart((prev) => !prev)}
            // We change blur behavior to require user to manually close cart
            onBlur={(e) => e.stopPropagation()}
            autoClose={false}
        >
            {shoppingCartProducts.length > 0 ? (
                shoppingCartProducts.map((p, i) => (
                    <DropdownItem
                        key={`prod-${String(p.id)}-${i}`}
                        className="d-flex flex-row align-items-center justify-content-evenly gap-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Button variant="light" className="p-1 me-2 d-flex" onClick={() => handleClearProduct(p)}>
                            ❌
                        </Button>
                        <Button variant="light" className="p-1 d-flex" onClick={() => handleRemoveProduct(p)}>
                            -
                        </Button>
                        {shoppingCartQuantities[p.id]}
                        <Button variant="light" className="p-1 me-2 d-flex" onClick={() => handleAddProduct(p)}>
                            +
                        </Button>
                        <img src={p.image} alt="👜" style={{ width: "5%" }} />
                        <p className="m-0 flex-grow-1">
                            {`${p.title.slice(0, 30).trim()}...`} - {`$${p.price.toFixed(2)}`}
                        </p>
                    </DropdownItem>
                ))
            ) : (
                <p className="ms-4">No items in cart!</p>
            )}
            <Button className="mx-3 mt-2 mb-1" onClick={() => handleCheckoutCart()}>
                Checkout <b>{displayTotal}</b>
            </Button>
        </DropdownButton>
    );
};

export default ShoppingCartDropdown;
