import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const signUpBtn = {
  background: '#26a69a',
  borderRadius: '10px',
  '&:hover': {
    background: '#689f38',
  },
  marginLeft: '10px',
};

const GuestMenu = () => {
  return (
    <>
      <Button component={NavLink} to="/login" color="inherit">
        Log In
      </Button>
      <Button sx={signUpBtn} component={NavLink} to="/register" color="inherit">
        Create account
      </Button>
    </>
  );
};

export default GuestMenu;