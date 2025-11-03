import Container from "react-bootstrap/Container";
import ProductsDisplay from "../ProductsDisplay";
import CategoriesDropdown from "./CategoriesDropdown";

const HomePageLayout = () => {

    return (
        <Container>
            <CategoriesDropdown />
            <ProductsDisplay />
        </Container>
    );
};

export default HomePageLayout;
