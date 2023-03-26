import { RegistrationForm, SubmitButton, Header } from "../Assets/styles";
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
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import { ThemeDetails } from "../../../Contexts/ThemeContext";
import LoadingButton from '@mui/lab/LoadingButton';

type FormProps = {
    uploadImage: (event: any) => Promise<void>,
    color: ThemeDetails,
    loading: boolean,
    url: string
}

export default function Form({ uploadImage, color, loading, url }: FormProps) {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <>
            <Header>
                <h1>Get Into The Sphere!</h1>
            </Header>
            <RegistrationForm>
                <Input color={color.fontColor} name="name" label="Name" />
                <Input color={color.fontColor} name="username" label="Username" />
                <Input color={color.fontColor} name="email" label="E-mail" />

                {!url ? (
                    <LoadingButton loading={loading} loadingPosition="start" color="secondary" startIcon={<PhotoCamera />} sx={{ m: 1, width: '33.875ch', height: "56px" }} variant="outlined" component="label">
                        Upload a Profile Picture
                        <input onChange={uploadImage} hidden accept="image/*" multiple type="file" />
                    </LoadingButton>
                ) : (<>Você já importou a sua foto!</>)}



                <FormControl color="secondary" sx={{ m: 1, width: '30ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
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

                <Button color="secondary" variant="contained" sx={{ backgroundColor: colors.orange, m: 1, width: '269.53px', height: "56px" }}>Sign Up!</Button>
                <Link to="/sign-in">Do you already have an account? Sign In Instead!</Link>
            </RegistrationForm>
        </>

    )
}