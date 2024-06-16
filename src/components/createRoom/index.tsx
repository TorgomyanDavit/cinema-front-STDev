import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ClickToOutsideClose from '../closePopUp';
import { useCreateMovieMutation, useEditeMovieMutation } from '../../services/movies/moviesApi';
import Input from '../OriginalInput';
import PhotoUploader from '../PhotoUpload';
import BasicDatePicker from '../dataPicker/dataTime';
import dayjs from 'dayjs';
import BasicTimePicker from '../dataPicker/timer';
import "./style.scss";



export const createPostScheme = yup.object().shape({
    title:yup.string().min(2).required(),
    show_datetime:yup.string().min(2).required()
    // playlistImg:yup.string().required(),
});

export default function CreateRoom({onClose,NewData,SetMessage,RoomID}:any) {

    const { register,handleSubmit, setValue, formState: { errors } } = useForm<any>({
        resolver:yupResolver(createPostScheme)
    });

    const formData = new FormData();
    
    const [createMovie,{isLoading:loadingCreate}] = useCreateMovieMutation()
    const [editeMovie,{isLoading:loadingEdit}] = useEditeMovieMutation()


    const onSubmit: SubmitHandler<any> = async (data:any) => {
        debugger
        const { title } = data
        formData.append("title", title);

        if(NewData) {
            formData.append("id", NewData?.id);

            await editeMovie(formData).unwrap().then((resp:any) => {
                if(resp.success) { SetMessage({success:resp.message}); onClose()} 
                else {  SetMessage({success:resp.message})  }
            })
        } else {
                formData.append("id", RoomID || "");
                await createMovie(formData).unwrap().then((resp:any) => {
                    if(resp.success) { SetMessage({success:resp.message}); onClose()} 
                    else {  SetMessage({success:resp.message})  }
                })
           
        }
    }

    const onError: SubmitHandler<any> = async (error) => {
        console.log(error)
    }

    useEffect(() => {
        if(NewData) {
          setValue("title",NewData?.title);
          setValue("show_datetime",NewData?.show_datetime);
          setValue("duration",NewData?.duration);
        } 
    },[NewData])


    console.log(NewData,"NewData");
    return (
        <form className='createPopUp_container_img' onSubmit={handleSubmit(onSubmit,onError)}>
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
                    </div>
                    <div className='Button_group'>
                        <Button sx={{width:"300px",textAlign:"right"}} type='submit' variant="outlined" onClick={onClose}>Close</Button>
                        <Button sx={{width:"300px",textAlign:"right"}} type='submit' variant="contained" endIcon={
                            loadingEdit || loadingCreate ? <CircularProgress size={18} style={{ color: 'black' }}/> : <SendIcon />
                        }>{NewData ? "Change" : "Add"} </Button>
                    </div>
                </div>
            </ClickToOutsideClose>
        </form>
    );
}