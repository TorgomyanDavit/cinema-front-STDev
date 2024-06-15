import "./style.scss";
import { Textarea } from "@mui/joy";

interface MultipleLanguageTextType {
  name: String;
  placeholder: string;
  register: any;
  minRow?: number;
  errors?: any;
  size?: any;
  modifierName?:string,
  registerName?:string,
  classname?:string,
  type?:string
}

export default function Input({name,registerName,placeholder,register,minRow,errors,size}: MultipleLanguageTextType) {

  return (
    <div className={`multipleLanguage`}>
      <div className="title">
        <p className="titleLang">{name}<span id="asterick">&#42;</span></p>
      </div>
      <Textarea
        {...register(registerName)}
        error={Object.keys(errors).includes(`${registerName}`)}
        id={`${registerName}`}
        placeholder={placeholder}
        size={size}
        minRows={minRow}
        maxRows={6}
        type={"text"}
      />
    </div>
  );
}
