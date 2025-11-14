import { db } from "../../firebaseConfig";
import { type Order } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

// Fetch Function
const fetchOrders = async (): Promise<Order[]> => {
    try {
        const collectionRef = collection(db, "orders");
        const docSnaps = await getDocs(collectionRef);
        const ordersArray = docSnaps.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Order[];

        return ordersArray;
    } catch (error) {
        throw new Error(`Could not retrieve 'orders': ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Using useQuery to fetch orders
const OrdersDisplay = () => {
    const { data, isLoading, isError, error } = useQuery<Order[]>({
        queryKey: ["orders"],
        queryFn: fetchOrders,
    });

    if (isLoading) return <Spinner />;
    if (isError) {
        console.error(String(error));
        return <p color="red">Error loading orders! {error.message}</p>;
    }
    return (
        <>
            {data?.map((order) => (
                <Card id={order.id}>
                    <Card.Header>Order #: {order.id}</Card.Header>
                    <Card.Body>
                        <ul>
                            {order.products.map((p) => (
                                <li key={p.title}>
                                    {p.title} x{order.productQuantities[p.id]}
                                </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
};

export default OrdersDisplay;
