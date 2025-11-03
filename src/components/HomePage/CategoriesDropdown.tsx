import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../../redux/store";
import { addFilter, removeFilter } from "../../redux/productsDisplaySlice";

import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
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
    const selectedCategories = useSelector((state: RootState) => state.productsDisplay.productCategoryFilters);
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
        <div className="d-flex flex-row">
            <DropdownButton id="dropdown-basic-button" title="Category Filter ">
                {data?.map((categoryName) => (
                    <Dropdown.Item key={categoryName} onClick={() => handleAddFilter(categoryName)}>
                        {categoryName}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
            <div>
                <ul className="d-flex flex-row justify-content-between gap-1">
                    {selectedCategories.map((category: string) => (
                        <Button key={category} onClick={() => handleRemoveFilter(category)} variant="light">
                            {category} <span style={{color: "red", fontWeight: "bold"}}>x</span>
                        </Button>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoriesDropdown;
