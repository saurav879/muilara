import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, Box, TextField } from '@mui/material'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ActionButton from './controls/ActionButton';

const Popup = (props) => {
    const { title, children, openPopup, setOpenPopup } = props;

    return (
        <>
            <Dialog open={openPopup} maxWidth="md" sx={{
                padding: (theme) => theme.spacing(2),
                position: 'absolute',
                top: (theme) => theme.spacing(5)
            }}>
                <DialogTitle sx={{ paddingRight: '0px'}}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant='6' component={"div"} sx={{ flexGrow: 1 }}>
                            {title}
                        </Typography>
                        <ActionButton
                            onClick={() => {setOpenPopup(console.log('false '));}}
                        >
                            <CloseRoundedIcon />
                        </ActionButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                {children}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Popup;