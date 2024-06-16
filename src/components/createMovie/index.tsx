import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import "./style.scss";
import ClickToOutsideClose from '../closePopUp';
import { useCreateMovieMutation, useEditeMovieMutation } from '../../services/movies/moviesApi';
import Input from '../OriginalInput';
import PhotoUploader from '../PhotoUpload';
import BasicDatePicker from '../dataPicker/dataTime';
import BasicTimePicker from '../dataPicker/timer';


export const createPostScheme = yup.object().shape({
    title:yup.string().required(),
    show_datetime:yup.string().required(),
    duration:yup.string().required()
});

export default function CreateMovie({onClose,NewData,SetMessage,RoomID}:any) {
    const { register,handleSubmit, setValue, formState: { errors } } = useForm<any>({
        resolver:yupResolver(createPostScheme)
    });

    const formData = new FormData();
    const [imgError,SetImgError] = useState<any>(false)
    const [ImgFile,SetPostsImg] = useState<any>(false);
    
    const [createMovie,{isLoading:loadingCreate}] = useCreateMovieMutation()
    const [editeMovie,{isLoading:loadingEdit}] = useEditeMovieMutation()

    const onSubmit: SubmitHandler<any> = async (data:any) => {
        const {title,show_datetime,duration} = data
        formData.append("title", title);
        formData.append("show_datetime", show_datetime);
        formData.append("duration", duration);

        if(NewData) {
            formData.append("id", NewData?.id);
            if(!!ImgFile) { 
                formData.append('photo', ImgFile);
            } 

            await editeMovie(formData).unwrap().then((resp:any) => {
                if(resp.success) { SetMessage({success:resp.message}); onClose()} 
                else {  SetMessage({success:resp.message})  }
            })
        } else {
            if(!!ImgFile) { 
                formData.append('photo', ImgFile);
                formData.append("id", RoomID || "");
                await createMovie(formData).unwrap().then((resp:any) => {
                    if(resp.success) { SetMessage({success:resp.message}); onClose()} 
                    else {  SetMessage({success:resp.message})  }
                })
            } else { 
                SetImgError(true) 
            }
        }
    }

    useEffect(() => {
        if(NewData) {
          setValue("title",NewData?.title);
          setValue("show_datetime",NewData?.show_datetime);
          setValue("duration",NewData?.duration);
        } 
    },[NewData])

    console.log(errors,"errors");
    console.log(NewData,"NewData");
    return (
        <form className='createPopUp_container_img' onSubmit={handleSubmit(onSubmit)}>
            <ClickToOutsideClose onClickOutside={() => "onClose()"}>
                <div className='centerPopUp'>
                    <div className='popUptopSide'>
                        <div className='textField_cover'>
                            <Input
                                register={register}
                                registerName={"title"}
                                name={"Movie name"}  
                                placeholder={"Write movie name"}
                                errors={errors}
                                minRow={1.2}
                                size="lg"
                                modifierName={"Movie name"}
                            />
                        </div>
                        <BasicDatePicker
                            onChange={(newValue) => {
                                setValue('show_datetime',  newValue?.format('YYYY-MM-DD HH:mm'))
                            }} 
                            error={errors?.show_datetime}
                        />

                        <BasicTimePicker
                            onChange={(newValue) => {
                                setValue('duration', newValue?.format('HH:mm:ss'))
                            }} 
                            error={errors?.duration}
                        />
                        
                        <PhotoUploader
                            image={NewData ? NewData?.poster_url : ''}
                            name={"Main imges"} 
                            errors={(!ImgFile && imgError)}
                            choseImgData={({file}:any) => {SetPostsImg(file)}}
                            className={"photo_homeSlider"}
                        />
                    </div>
                    <div className='Button_group'>
                        <Button sx={{width:"300px",textAlign:"right"}} type='submit' variant="outlined" onClick={onClose}>Close</Button>
                        <Button sx={{width:"300px",textAlign:"right"}} type='submit' variant="contained" endIcon={
                            loadingEdit || loadingCreate ? <CircularProgress size={18} style={{ color: 'black' }}/> : <SendIcon />
                        }>{NewData ? "Change movie" : "Add movie"} </Button>
                    </div>
                </div>
            </ClickToOutsideClose>
        </form>
    );
}