const MyComponent = (props) => {
    return (
        <div className="relative   mx-auto p-5 border   shadow-lg rounded-md bg-white">
            <div className={'flex justify-between p-3 border-b-2 '}>
                <div>{props.title}</div>
                <div
                    className={'cursor-pointer   rounded text-red-500 scale-150'}
                    onClick={props.closeModal}
                > &#215;
                </div>
            </div>
            <div className={'mt-4  p-3 border-b-2 '}>
                {props.children}
            </div>
            <div className={'mt-4  p-3 flex gap-5 justify-center'}>
                <button
                    className={'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded'}
                    onClick={props.closeModal}>لغو
                </button>
                <button
                    className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'}
                    onClick={props.onSubmit}>تایید
                </button>
            </div>


        </div>
    );
};

export default MyComponent;
