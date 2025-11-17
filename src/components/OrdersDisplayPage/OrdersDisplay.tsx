import { db } from "../../firebaseConfig";
import { type Order } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { useFirebaseAuth } from "../LoginLogout/FirebaseAuthProvider";

// NOTE:
// WE ARE DOING LOTS OF EXTRA WORK HERE, GOING THROUGH TO FILTER BASED ON USERID IS
// CAUSING O(N) TO BE O(2N) WHICH IN THEORY IS FINE, BUT WILL GET REALLY SLOW...

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
    const { user } = useFirebaseAuth();
    const filteredOrders = data?.filter((order) => order.userId === user?.uid);

    if (isLoading) return <Spinner className="d-block mx-auto mt-5" />;
    if (isError) {
        console.error(String(error));
        return <p color="red">Error loading orders! {error.message}</p>;
    }
    return (
        <>
            {filteredOrders?.map((order) => (
                <Card key={order.id} className="mb-3">
                    <Card.Header>
                        <b>Order # {order.id}</b>
                        <br />
                        {order.creationDateTime.toDate().toLocaleString(undefined, {
                            dateStyle: "short",
                            timeStyle: "short",
                        })}
                        <br />
                        <br />
                        <p>Order Total: ${order.total}</p>
                    </Card.Header>
                    <Card.Body className="p-0 pt-3">
                        <ul>
                            {order.products.map((p) => (
                                <li key={p.title}>
                                    {p.title} x{order.productQuantities[p.id]}
                                </li>
                            ))}
                        </ul>
                    </Card.Body>
                    <Button className="w-25 d-block mx-auto mb-3">Order Details</Button>
                </Card>
            ))}
        </>
    );
};

export default OrdersDisplay;
