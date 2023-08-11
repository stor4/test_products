import React from 'react'
import { Box, Typography } from '@mui/material'
import '../fonts/fonts.css'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();

    let text = ''

    if (location.pathname === '/') {
        text = 'PRODUCT LIST PAGE'
      } else if (location.pathname.startsWith('/product')) {
        text = 'PRODUCT PAGE'
      } else {
        text = ''}
      
return (
    <Box sx={{height: '100px', width: '100%', backgroundColor: '#FFCC26', display: 'flex', justifyContent: 'end', borderBottom: 'solid #414141 1px'}}>
        <Typography sx={{fontFamily: 'Anek Telugu', 
        fontSize: '32px', 
        fontWeight: '600',
        mt: '28px',
        mr: '15px',
        color: '#414141'}}
        >{text}</Typography>
    </Box>
)}

export default Navbar