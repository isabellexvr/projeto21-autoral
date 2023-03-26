import { TextField } from "@mui/material";

type InputProps = {
    color: string,
    name: string,
    label: string
}

export default function Input({ color, name, label }: InputProps) {
    console.log(color)
    return (
        <>
            {color === "#FFFFFF" && (
                <TextField InputLabelProps={{
                    style: {
                        color: 'white'
                    }
                }} color="secondary" sx={{
                    m: 1, width: '30ch', '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        }
                    },
                }} name={name} label={label} variant="outlined" />
            )}
            {
                color === '#272727' && (
                    <TextField InputLabelProps={{
                        style: {
                            color: 'black'
                        }
                    }} color="secondary" sx={{
                        m: 1, width: '30ch', '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black',
                            }
                        },
                    }} name={name} label={label} variant="outlined" />
                )
            }
        </>


    )
}