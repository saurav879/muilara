import PropTypes from 'prop-types'

import { Card, Typography, alpha, styled } from '@mui/material'
import { fShortenNumber } from '../../util/formatNumber'
import Iconify from '../iconify/iconify'

const StyledIcon = styled('div')(({theme}) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
}));



const AppWidgetSummary = ({ title, total, icon, color = 'primary', sx, ...other }) => {
    return (
        <Card
            sx={{
                py: 5,
                boxShadow: 0,
                borderRadius: '12px',
                textAlign: 'center',
                color: (theme) => theme.palette[color].darker,
                bgcolor: (theme) => theme.palette[color].lighter,
                ...sx,
            }}
            {...other}
        >
            <StyledIcon
                sx={{
                    color: (theme) => theme.palette[color].dark,
                    backgroundImage: (theme) => 
                    `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                        theme.palette[color].dark,
                        0.24
                      )} 100%)`,
                }}
            >
                <Iconify icon={icon} width={24} height={24} />
            </StyledIcon>
            <Typography variant='h3'>{fShortenNumber(total)}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                {title}
            </Typography>
        </Card>
    );
}

AppWidgetSummary.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    sx: PropTypes.object,
};

export default AppWidgetSummary;