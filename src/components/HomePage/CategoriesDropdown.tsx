import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Spinner from "react-bootstrap/Spinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CategoriesDropdown = () => {
    const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

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
    return (
        <DropdownButton id="dropdown-basic-button" title="Category Filter">
            <Dropdown.Item>
                {data?.map((categoryName) => (
                    <Dropdown.Item onClick={}>{categoryName}</Dropdown.Item>
                ))}
            </Dropdown.Item>
        </DropdownButton>
    );
};

export default CategoriesDropdown;
