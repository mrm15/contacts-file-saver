import  {useRef} from 'react';

const FileType= ({ row, onBlur, onChange}) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const uploadFileHandle = e => {
    const file = e.target.files[0];
    // let value = e.target.value;
    // Continue with your logic
    onChange(file);
  }

  const myValue = (row?.value?.name) || (!row.value ? 'انتخاب' : row.value)
  try {
    return (<>
      <button
        onBlur={onBlur}
        className={' custom__input__file__form  rlookup__like_select__option'}
        type="button" onClick={handleButtonClick}>
        {myValue}
      </button>
      <input
        ref={fileInputRef}
        onBlur={onBlur}
        accept={row?.extention?.join(',')}
        type="file"
        onChange={uploadFileHandle}
        style={{display: 'none'}} // Hide the original input
      />
      <div className="d-flex font__size__10">

        {row?.link && <div> <a target={"_blank"} href={row.link} download={true}>دانلود</a> </div>}
      </div>

    </>);
  } catch (error) {
    return <></>;
  }
};

export default FileType;