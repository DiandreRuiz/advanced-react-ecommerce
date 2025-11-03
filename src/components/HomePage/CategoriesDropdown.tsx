import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CategoriesDropdown = () => {
    const fetchCategories = async (): Promise<string[]> => {
        const response = await axios.get("https://fakestoreapi.com/products/categories");
        return response.data;
    };
    const { data, isLoading, isError, error } = useQuery<string[]>({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    if (isLoading) return <Spinner />;
    if (isError) return <p color="red">Error getting product categories: {error.message}</p>;
    return <Dropdown></Dropdown>;
};

export default CategoriesDropdown;
