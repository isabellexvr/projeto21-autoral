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
import { TextField } from "@mui/material";
import { colors } from "../../../assets/colors";
import { useState } from "react";


export default function Form({ uploadImage }) {

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
                <TextField color="secondary" sx={{ m: 1, width: '30ch' }} name="name" label="Name" variant="outlined" />
                <TextField color="secondary" sx={{ m: 1, width: '30ch' }} name="username" label="Username" variant="outlined" />
                <TextField color="secondary" sx={{ m: 1, width: '30ch' }} name="e-mail" label="E-mail" variant="outlined" type="email" />

                <Button color="secondary" startIcon={<PhotoCamera />} sx={{ m: 1, width: '33.875ch', height: "56px" }} variant="outlined" component="label">
                    Upload a Profile Picture
                    <input onChange={uploadImage} hidden accept="image/*" multiple type="file" />
                </Button>
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
                        label="ergrgegrwegwegweg"
                        sx={{
                            "::placeholder": {
                                color: "red"
                            }
                        }}
                    />
                </FormControl>
                <br />

                <Button color="secondary" variant="contained" sx={{backgroundColor: colors.orange, m: 1, width: '269.53px', height: "56px"}}>Sign Up!</Button>
            </RegistrationForm>
        </>

    )
}