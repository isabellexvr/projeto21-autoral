import { RegistrationForm, SubmitButton, Header, PreviewPic, UploadPicContainer } from "../Assets/styles";
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Button } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { colors } from "../../../assets/colors";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import { ThemeDetails } from "../../../Contexts/ThemeContext";
import LoadingButton from '@mui/lab/LoadingButton';
import { FormEventHandler } from "react";

type FormProps = {
    uploadImage: (event: any) => Promise<void>,
    color: ThemeDetails,
    loading: boolean,
    url: string
}

type NewUserInfo = {
    fullName: string,
    userName: string,
    email: string,
    password: string,
    confirmPassword: string,
    picture: string
}

export default function Form({ uploadImage, color, loading, url }: FormProps) {

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState<Partial<NewUserInfo>>({});
    const test = useRef({});

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    type HandleFormTypes = {
        target: {
            value: string,
            name: string
        }

    }

    function handleForm({ target: { value, name } }: HandleFormTypes) {
        setForm({ ...form, [name]: value, });
        console.log(form)
    }

    function sendForm(e: any) {
        e.preventDefault();
        e.target.reset()
        if (form.password !== form.confirmPassword) {
            alert("As senhas não correspondem.")
            return;
        }
        delete form.confirmPassword
        const send = { ...form, picture: url }
        console.log(send)
        setForm({})
    }

    return (
        <>
            <Header>
                <h1>Get Into The Sphere!</h1>
            </Header>
            <RegistrationForm onSubmit={sendForm}>
                <Input color={color.fontColor} name="fullName" label="Name" handleForm={handleForm} />
                <Input color={color.fontColor} name="userName" label="Username" handleForm={handleForm} />
                <Input color={color.fontColor} name="email" label="E-mail" handleForm={handleForm} />

                {!url ? (
                    <LoadingButton loading={loading} loadingPosition="start" color="secondary" startIcon={<PhotoCamera />} sx={{ m: 1, width: '33.875ch', height: "56px" }} variant="outlined" component="label">
                        Upload a Profile Picture
                        <input onChange={uploadImage} hidden accept="image/*" multiple type="file" />
                    </LoadingButton>
                ) : (
                    <UploadPicContainer>
                        <LoadingButton loading={loading} loadingPosition="start" color="secondary" startIcon={<PhotoCamera />} sx={{ m: 1, width: '25ch', height: "56px" }} variant="outlined" component="label">
                            Change Picture
                            <input onChange={uploadImage} hidden accept="image/*" multiple type="file" />
                        </LoadingButton>
                        <PreviewPic src={url} />
                    </UploadPicContainer>

                )}



                <FormControl color="secondary" sx={{ m: 1, width: '30ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        onChange={handleForm}
                        name="password"
                        color="secondary"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    color="secondary"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl color="secondary" sx={{ m: 1, width: '30ch' }} variant="outlined">
                    <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        onChange={handleForm}
                        name="confirmPassword"
                        color="secondary"
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    color="secondary"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <br />

                <Button type="submit" color="secondary" variant="contained" sx={{ backgroundColor: colors.orange, m: 1, width: '269.53px', height: "56px" }}>Sign Up!</Button>
                <Link to="/sign-in">Do you already have an account? Sign In Instead!</Link>
            </RegistrationForm>
        </>

    )
}

