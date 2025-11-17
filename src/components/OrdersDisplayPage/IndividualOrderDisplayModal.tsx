import Modal from "react-bootstrap/Modal";
import { type Order } from "../../types";

interface IndividualOrderDisplayModalProps {
    show: boolean;
    selectedOrder: Order | null;
    onHide: () => void;
}

const IndividualOrderDisplayModal = ({ show, selectedOrder, onHide }: IndividualOrderDisplayModalProps) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                Order #: {selectedOrder?.id}
                <br />
                {selectedOrder?.creationDateTime.toDate().toLocaleString(undefined, {
                    dateStyle: "short",
                })}
                {" @ "}
                {selectedOrder?.creationDateTime.toDate().toLocaleString(undefined, {
                    timeStyle: "short",
                })}
            </Modal.Header>
            <Modal.Body>
                {selectedOrder?.products.map((p) => (
                    <p key={p.id}>
                        <img src={p.image} style={{ width: "20px" }}></img> {p.title}{" "}
                        <b>
                            {"(x"}
                            {selectedOrder.productQuantities[p.id]}
                            {")"}
                        </b>
                    </p>
                ))}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-start">Order Total: ${selectedOrder?.total}</Modal.Footer>
        </Modal>
    );
};

export default IndividualOrderDisplayModal;
