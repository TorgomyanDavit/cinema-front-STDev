import { useEffect, useState } from "react";
import "./style.scss";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

interface PhotoUploaderType {
  name: string;
  errors?: any;
  choseImgData: any;
  image?: string | undefined;
  className?:string | undefined;
}

export default function PhotoUploader({name,errors,choseImgData,image,className}: PhotoUploaderType) {
  const [imgUrl, setImgUrl] = useState(image);

  const reader = new FileReader();
  reader.addEventListener("load", (e: any) => {
    setImgUrl(e.target.result);
  });

  const setFormData = async (file:File) => {
    choseImgData({file,imgUrl});
  };

  useEffect(() => { if(image) {  setImgUrl(image) } },[image])

  return (
    <div className={`photoDetail ${className}`}>
      <p className="title_photo">
        {name} <span id="asterick">&#42;</span>
      </p>
      <div className="file_Parent" style={{backgroundImage: imgUrl ? `url(${imgUrl})` : ''}}>
        <label className={`custom-file-upload ${!!errors ? "errorsClass" : ''}`}>
            <input
              className={`file-input`}
              type="file"
              onChange={(event:any) => {
                reader.readAsDataURL(event.target.files[0]), 
                setFormData(event.target.files[0])
              }}
              accept="image/*"
            />
            <DriveFolderUploadIcon color="primary"/>
          </label>
      </div>
    </div>
  );
}
