import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";
import { removeProduct } from "../redux/shoppingCartSlice";
import type { AppDispatch } from "../redux/store";
import type { Product } from "../types";

const ShoppingCartDropdown = () => {
    const [showCart, setShowCart] = useState<boolean>(false);

    // Redux
    const shoppingCartProducts = useSelector((state: RootState) => state.shoppingCart.products);
    const shoppingCartTotal = useSelector((state: RootState) => state.shoppingCart.totalPrice.toFixed(2));
    const dispatch = useDispatch<AppDispatch>();
    const handleRemoveProduct = (product: Product) => dispatch(removeProduct(product));

    return (
        <DropdownButton
            id="dropdown-basic-button"
            variant="warning"
            title={`${parseFloat(shoppingCartTotal) > 0 ? `🛒 $${shoppingCartTotal}` : `🛒`}`}
            className="d-flex"
            show={showCart}
            onToggle={() => setShowCart((prev) => !prev)}
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
                        <Button variant="light" className="p-1 me-2 d-flex" onClick={() => handleRemoveProduct(p)}>
                            ❌
                        </Button>
                        <img src={p.image} alt="👜" style={{ width: "5%" }} />
                        <p className="m-0 flex-grow-1">
                            {`${p.title.slice(0, 30).trim()}...`} - {`$${p.price.toFixed(2)}`}
                        </p>
                    </DropdownItem>
                ))
            ) : (
                <p>No items in cart!</p>
            )}
            <Button className="mx-auto">View Cart</Button>
        </DropdownButton>
    );
};

export default ShoppingCartDropdown;
