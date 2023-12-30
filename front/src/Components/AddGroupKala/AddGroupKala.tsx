import {useState} from "react";
import Modal from "../Modal/Modal";
import {toast} from "react-toastify";
import ObjectDataHolder from "../../hooks/ObjectDataHolder.tsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";


const AddGroupKala = ({setReload}) => {


    const axiosPrivate = useAxiosPrivate();


    const [sendData, setSendData] = ObjectDataHolder({
        newCategory: ""
    })
    const [openModal, setOpenModal] = useState<boolean>(false)

    const closeModal = () => setOpenModal(false)


    const submitAddGroupKala = () => {

        const newCat = axiosPrivate.post("/api/productGroup/new", sendData).then(res => {
            //console.log(res.data)
            if (res.data.status) {
                toast.success(res.data.message);
                setReload(Math.random())

                closeModal()
            } else {
                toast.error(res.data.message)

            }
        });

        void toast.promise(newCat, {
            pending: "در حال ثبت",
            // success:"ثبت شد",
            error: "خطا در ثبت اطلاعات"
        });

    }
    return (
        <>
            {openModal && <Modal
              closeModal={closeModal}
              title={"افزودن دسته"}
              onSubmit={submitAddGroupKala}
            >
              <>
                <div className="w-full max-w-lg">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        نام دسته بندی
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-password"
                        type="text"
                        placeholder="دسته بندی جدید"
                        value={sendData.newCategory}
                        onChange={(event) => setSendData(
                            {newCategory: event.target.value}
                        )}
                      />
                      <p className="text-gray-600 text-xs italic">
                        نمارنگ، سرعت، کیفیت </p>
                    </div>
                  </div>
                </div>

              </>

            </Modal>}
            <div className={'w-full text-left'}>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white   border border-blue-500 hover:border-transparent rounded w-40 p-4 text-center"
                    onClick={() => setOpenModal(true)}
                >
                    افزودن دسته بندی
                </button>
            </div>

        </>
    );
};

export default AddGroupKala;
