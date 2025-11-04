import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";
import { removeProduct } from "../redux/shoppingCartSlice";
import type { AppDispatch } from "../redux/store";
import type { Product } from "../types";

const ShoppingCartDropdown = () => {
    // Redux
    const shoppingCartProducts = useSelector((state: RootState) => state.shoppingCart.products);
    const shoppingCartTotal = useSelector((state: RootState) => parseFloat(state.shoppingCart.totalPrice.toFixed(3)));
    const dispatch = useDispatch<AppDispatch>();
    const handleRemoveProduct = (product: Product) => dispatch(removeProduct(product));

    return (
        <DropdownButton id="dropdown-basic-button" variant="warning" title={`🛒 $${shoppingCartTotal}`}>
            {shoppingCartProducts.map((p) => (
                <DropdownItem key={p.id} className="d-flex flex-row align-items-center">
                    <Button variant="light" className="p-1 me-2 d-flex align-items-center justify-content-center" onClick={() => handleRemoveProduct(p)}>
                        ❌
                    </Button>
                    <p className="m-0 flex-grow-1">
                        {p.title.slice(0, 20)} {parseFloat(p.price.toFixed(3))}
                    </p>
                </DropdownItem>
            ))}
        </DropdownButton>
    );
};

export default ShoppingCartDropdown;
