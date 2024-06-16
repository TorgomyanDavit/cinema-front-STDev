import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ClickToOutsideClose from '../closePopUp';
import Input from '../OriginalInput';
import "./style.scss";
import { isEmpty } from '../../utils';
import { useCreateRoomMutation, useEditeRoomMutation } from '../../services/room/roomApi';



export const createPostScheme = yup.object().shape({
    title:yup.string().min(2).required(),
});

export default function CreateRoom({onClose,NewData,SetMessage}:any) {

    const { register,handleSubmit, setValue, formState: { errors } } = useForm<any>({
        resolver:yupResolver(createPostScheme)
    });

    const formData = new FormData();
    
    const [createRoom,{isLoading:loadingCreate}] = useCreateRoomMutation()
    const [editeRoom,{isLoading:loadingEdit}] = useEditeRoomMutation()

    const onSubmit: SubmitHandler<any> = async (data:any) => {
        const { title } = data
        formData.append("title", title);

        if(!isEmpty(NewData)) {
            formData.append("id", NewData?.RoomID);
            await editeRoom(formData).unwrap().then((resp:any) => {
                if(resp.success) { SetMessage({success:resp.message}); onClose()} 
                else {  SetMessage({success:resp.message})  }
            })
        } else {
            await createRoom(formData).unwrap().then((resp:any) => {
                if(resp.success) { SetMessage({success:resp.message}); onClose()} 
                else {  SetMessage({success:resp.message})  }
            })
        }
    }

    const onError: SubmitHandler<any> = async (error) => {
        console.log(error)
    }

    useEffect(() => {
        if(!isEmpty(NewData)) {
          setValue("title",NewData?.roomName);
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
                                name={"Room name"}  
                                placeholder={"Write room name"}
                                errors={errors}
                                minRow={1.2}
                                size="lg"
                                modifierName={"Room name"}
                            />
                        </div>
                    </div>
                    <div className='Button_group'>
                        <Button sx={{width:"300px",textAlign:"right"}} type='submit' variant="outlined" onClick={onClose}>Close</Button>
                        <Button sx={{width:"300px",textAlign:"right"}} type='submit' variant="contained" endIcon={
                            loadingEdit || loadingCreate ? <CircularProgress size={18} style={{ color: 'black' }}/> : <SendIcon />
                        }>{!isEmpty(NewData) ? "Change room" : "Add room"} </Button>
                    </div>
                </div>
            </ClickToOutsideClose>
        </form>
    );
}