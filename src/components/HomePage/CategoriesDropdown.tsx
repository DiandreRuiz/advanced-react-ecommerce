import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../../redux/store";
import { addFilter, removeFilter } from "../../redux/productsDisplaySlice";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Spinner from "react-bootstrap/Spinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CategoriesDropdown = () => {
    // React Query for server-side categories
    const fetchCategories = async (): Promise<string[]> => {
        const response = await axios.get("https://fakestoreapi.com/products/categories");
        return response.data;
    };
    const { data, isLoading, isError, error } = useQuery<string[]>({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    // Redux for state management of categories to render
    const selectedCategories = useSelector((state: RootState) => state.products.productCategoryFilters);
    const dispatch = useDispatch<AppDispatch>();

    // Filter Change Handlers
    const handleAddFilter = (filterName: string) => {
        dispatch(addFilter(filterName));
    };
    const handleRemoveFilter = (filterName: string) => {
        dispatch(removeFilter(filterName));
    };

    if (isLoading) return <Spinner />;
    if (isError) return <p color="red">Error getting product categories: {error.message}</p>;
    return (
        <>
            <div>
                <h1>Current Filters</h1>
                <ul>
                    {selectedCategories.map((category: string) => (
                        <li key={category} onClick={() => handleRemoveFilter(category)}>
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
            <DropdownButton id="dropdown-basic-button" title="Category Filter">
                <Dropdown.Item>
                    {data?.map((categoryName) => (
                        <Dropdown.Item onClick={() => handleAddFilter(categoryName)}>{categoryName}</Dropdown.Item>
                    ))}
                </Dropdown.Item>
            </DropdownButton>
        </>
    );
};

export default CategoriesDropdown;
