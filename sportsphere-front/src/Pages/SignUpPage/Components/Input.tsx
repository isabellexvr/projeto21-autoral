import { TextField } from "@mui/material";
import { colors } from "../../../assets/colors";

type InputProps = {
    color: string,
    name: string,
    label: string,
    handleForm: ({ target: { value, name } }: { target: { value: any; name: any; }; }) => void
}

export default function Input({ color, name, label, handleForm }: InputProps) {
    return (
        <>
            {color === "#FFFFFF" && (
                <TextField onChange={handleForm} InputLabelProps={{
                    style: {
                        color: 'white'
                    }
                }} color="secondary" sx={{
                    m: 1, width: '30ch', '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        }, '&:hover fieldset': {
                            borderColor: '#9c27b0',
                        },
                    }
                }} name={name} label={label} variant="outlined" />
            )}
            {
                color === '#272727' && (
                    <TextField onChange={handleForm} InputLabelProps={{
                        style: {
                            color: 'black'
                        }
                    }} color="secondary" sx={{
                        m: 1, width: '30ch', '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black',
                            }, '&:hover fieldset': {
                                borderColor: '#9c27b0',
                            },
                        }
                    }} name={name} label={label} variant="outlined" />
                )
            }
        </>


    )
}