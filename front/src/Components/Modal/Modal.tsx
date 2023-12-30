import {Portal} from "../Portal/Portal.tsx";
import ModalView from "./ModalView.tsx";

const Modal = (props) => {
    const {closeModal} = props
    return (
        <Portal>
            <div
                style={{
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    // top: "50%",
                    // left: "50%",
                    // transform:" translate(-50%, -50%)",
                    zIndex: 100,
                    background: "rgba(0,0,0,0.5)"
                }}
                onClick={closeModal}
            />
            <div
                className={'ease-in-out'}
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 101

                }}
            >

                <ModalView {...props}>
                    {props.children}
                </ModalView>

            </div>
        </Portal>
    );
};

export default Modal;
