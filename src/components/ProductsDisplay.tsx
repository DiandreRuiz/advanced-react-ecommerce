import { useQuery } from "@tanstack/react-query";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { collection, getDocs } from "firebase/firestore";
import type { Product } from "../types";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { type AppDispatch } from "../redux/store";
import { addProduct } from "../redux/shoppingCartSlice";
import { db } from "../firebaseConfig";

// Fetch function
const fetchProducts = async (): Promise<Product[]> => {
    const collectionRef = collection(db, "products");
    const querySnapshot = await getDocs(collectionRef);
    const productsArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
    })) as Product[];

    return productsArray;
};

// Using useQuery hook to fetch products
const ProductsDisplay = () => {
    const { data, isLoading, isError, error } = useQuery<Product[]>({
        queryKey: ["products", "firestore"],
        queryFn: fetchProducts,
    });

    // Redux
    // For category filter
    const selectedCategories = useSelector((state: RootState) => state.productsDisplay.productCategoryFilters);
    // For add to cart
    const dispatch = useDispatch<AppDispatch>();
    const handleAddProduct = (product: Product) => dispatch(addProduct(product));

    const validProducts =
        selectedCategories.length > 0 ? data?.filter((p) => selectedCategories.includes(p.category)) : data;

    if (isLoading) return <Spinner />;
    if (isError) {
        console.log(String(error));
        return <p color="red">Error loading products! {error.message}</p>;
    }
    return (
        <>
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
                                <Button onClick={() => handleAddProduct(p)}>Add to Cart</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default ProductsDisplay;
