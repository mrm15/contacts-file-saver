import ReactDOM from 'react-dom';

export const Portal = (props) => {
    const portalElement = document.getElementById('overlay__root');
    return ReactDOM.createPortal(<div


        >
            {props.children}
        </div>, portalElement
    );
};