import { useQuery } from "@tanstack/react-query";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

// Product return from the FakeStore API
type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};

// Fetch function
const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
};

// Using useQuery hook to fetch products
const ProductsDisplay = () => {
    const { data, isLoading, isError, error } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    // Could probably be moved to parent element: HomePageLayout.tsx
    const selectedCategories = useSelector((state: RootState) => state.productsDisplay.productCategoryFilters);
    const validProducts = selectedCategories.length > 0 ? data?.filter((p) => selectedCategories.includes(p.category)) : data;

    if (isLoading) return <Spinner />;
    if (isError) {
        console.log(String(error));
        return <p color="red">Error loading products! {error.message}</p>;
    }
    return (
        <>
            <Row>
                <Col></Col>
            </Row>
            <Row>
                {validProducts?.map((p) => (
                    <Col key={p.id} xs={12} sm={6} lg={4} xl={3} className="mb-2">
                        <Card className="h-100">
                            <Card.Img src={p.image} alt={p.title} className="w-50" />
                            <Card.Body>
                                <Card.Title className="fs-6">{p.title}</Card.Title>
                                <Card.Text className="mb-1">
                                    <strong>${p.price.toFixed(2)}</strong>
                                </Card.Text>
                                <Card.Text className="text-muted">{p.category}</Card.Text>
                                <Card.Text className="text-truncate">{p.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-center">
                                <Button className="">Add to Cart</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default ProductsDisplay;
