import { useState } from "react";
import { db } from "../../firebaseConfig";
import { type Order } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { useFirebaseAuth } from "../LoginLogout/FirebaseAuthProvider";
import IndividualOrderDisplayModal from "./IndividualOrderDisplayModal";

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
    const [showIndividualModal, setShowIndividualModal] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleIndividualOrderModalHide = () => {
        setShowIndividualModal(false);
    };

    const handleSelectOrder = (order: Order) => {
        setSelectedOrder(order);
        setShowIndividualModal(true);
    };

    if (isLoading) return <Spinner className="d-block mx-auto mt-5" />;
    if (isError) {
        console.error(String(error));
        return <p color="red">Error loading orders! {error.message}</p>;
    }
    return (
        <>
            <IndividualOrderDisplayModal
                show={showIndividualModal}
                selectedOrder={selectedOrder}
                onHide={handleIndividualOrderModalHide}
            />
            <div>
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
                            <p className="mb-0">${order?.total}</p>
                            <Button className="mb-2 mt-2 btn-sm d-block" onClick={() => handleSelectOrder(order)}>
                                Order Details
                            </Button>
                        </Card.Header>
                        <Card.Body className="p-3 d-flex gap-3">
                            {order.products.map((p) => (
                                <img key={p.title} src={p.image} style={{ height: "80px" }} />
                            ))}
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default OrdersDisplay;
