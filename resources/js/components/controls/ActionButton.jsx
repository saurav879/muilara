import React from 'react'
import { Button } from '@mui/material';

const ActionButton = (props) => {
    const { children, onClick } = props;

    return (
        <Button onClick={onclick} color='secondary'>
            {children}
        </Button>
    );
}

export default ActionButton;