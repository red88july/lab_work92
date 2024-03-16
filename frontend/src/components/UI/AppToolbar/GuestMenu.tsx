import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const signUpBtn = {
  background: '#26a69a',
  borderRadius: '10px',
  '&:hover': {
    background: '#689f38',
  },
};

const outerBox = {
  display: 'flex',
  gap: '20px',
};

const GuestMenu = () => {
  return (
    <>
      <Box sx={outerBox}>
        <Button component={NavLink} to="/login" color="inherit" startIcon={<LoginIcon />}>
          Log In
        </Button>
        <Button sx={signUpBtn} component={NavLink} to="/register" color="inherit" startIcon={<PersonAddIcon />}>
          Create account
        </Button>
      </Box>
    </>
  );
};

export default GuestMenu;