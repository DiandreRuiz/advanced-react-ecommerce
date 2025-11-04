import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";

const ShoppingCartDropdown = () => {
    const shoppingCartProducts = useSelector((state: RootState) => state.shoppingCart.products);
    const shoppingCartTotal = useSelector((state: RootState) => parseFloat(state.shoppingCart.totalPrice.toFixed(2)));

    return (
        <DropdownButton id="dropdown-basic-button" variant="warning" title={`🛒 $${shoppingCartTotal}`}>
            {shoppingCartProducts.map((p) => (
                <DropdownItem key={p.id}>
                    {p.title} - {p.price}
                </DropdownItem>
            ))}
        </DropdownButton>
    );
};

export default ShoppingCartDropdown;
