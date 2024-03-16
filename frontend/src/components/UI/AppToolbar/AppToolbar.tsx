import { NavLink } from 'react-router-dom';
import { AppBar, Box, Grid, styled, Toolbar, Typography } from '@mui/material';

import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../../features/users/usersSlice.ts';

import UserMenu from './UserMenu';
import GuestMenu from './GuestMenu';

import LogoChat from '../../../assets/pic/logo.jpg';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar sx={{mb: 2, padding: 1}}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Link to="/">
            <Box display='flex' alignItems='center' gap={2}>
              <Box
                component="img"
                src={LogoChat}
                alt="Logo chat"
              />
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Chat App
              </Typography>
            </Box>
          </Link>
          {user ? (
            <UserMenu user={user}/>
          ) : (
            <GuestMenu/>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;