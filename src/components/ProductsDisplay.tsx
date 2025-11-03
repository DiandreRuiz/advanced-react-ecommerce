import { useQuery } from "@tanstack/react-query";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

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

    if (isLoading) return <Spinner />;
    if (isError) {
        console.log(String(error));
        return <p color="red">Error loading products! {error.message}</p>;
    }
    return (
        <Row className="g-4">
            {data?.map((p) => (
                <Col key={p.id} xs={12} sm={6} lg={4} xl={3}>
                    <Card className="h-100">
                        <Card.Img src={p.image} alt={p.title} />
                        <Card.Body>
                            <Card.Title className="fs-6">{p.title}</Card.Title>
                            <Card.Text className="mb-1">
                                <strong>${p.price.toFixed(2)}</strong>
                            </Card.Text>
                            <Card.Text className="text-muted">{p.category}</Card.Text>
                            <Card.Text className="text-truncate">{p.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ProductsDisplay;
