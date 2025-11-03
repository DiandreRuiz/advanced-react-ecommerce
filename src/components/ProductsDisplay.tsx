import { useQuery } from "@tanstack/react-query";
import Spinner from "react-bootstrap/Spinner";
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
const Products = () => {
    const { data, isLoading, error } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    if (isLoading) return <Spinner />;
    if (error) {
        console.log(String(error));
        return <p color="red">Error loading products!</p>;
    }
    return (
        <ul>
            {data?.map((p) => (
                <li key={p.id}>
                    <p>Title: {p.title}</p>
                    <p>Price: {p.price}</p>
                    <p>Category: {p.category}</p>
                    <p>Description: {p.description}</p>
                    <p>Image: {p.image}</p>
                </li>
            ))}
        </ul>
    );
};
