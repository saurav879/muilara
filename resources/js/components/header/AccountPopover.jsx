import React from 'react'
import { alpha } from "@mui/material/styles";
import { Avatar, Box, Divider, IconButton, MenuItem, Popover, Stack, Typography } from "@mui/material";
import imgurl from '../../assets/avatar/avatar_default.jpg'
import { useAuth } from '../../contexts/AuthContext'

const MENU_OPTIONs = [
    {
        label: 'Home',
        icon: 'eva:home-fill',
    },
    {
        label: 'Profile',
        icon: 'eva:persion-fill',
    },
    {
        label: 'Settings',
        icon: 'eva:settings-2-fill'
    },
];

const AccountPopover = () => {

    const { user } = useAuth();
    const [open, setOpen] = React.useState(null);

    const handleOpen = (e) => {
        setOpen(e.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    p: 0,
                    ...(open && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                        },
                    }),
                }}
            >
                <Avatar src={imgurl} alt="" />
            </IconButton>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{ vertical: 'top', horizontal: 'right'}}
                PaperProps={{
                    sx: {
                      p: 0,
                      mt: 1.5,
                      ml: 0.75,
                      width: 180,
                      '& .MuiMenuItem-root': {
                        typography: 'body2',
                        borderRadius: 0.75,
                      },
                    },
                  }}
            >
                <Box
                    sx={{ my: 1.5, px: 2.5}}
                >
                    <Typography variant='subtitle2' noWrap>
                        {user.name}
                    </Typography>
                    <Typography variant='body2' sx={{ color: 'text.secondary'}} noWrap>
                        {user.email}
                    </Typography>
                </Box>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Stack sx={{ p: 1 }}>
                    {MENU_OPTIONs.map((option) => (
                        <MenuItem key={option.label} onClick={handleClose}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <MenuItem onClick={handleClose} sx={{ m: 1}}>
                    Logout
                </MenuItem>
            </Popover>
        </>
    );
}

export default AccountPopover;