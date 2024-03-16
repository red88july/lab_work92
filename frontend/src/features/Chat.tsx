import React from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import backgroundChat from '../assets/pic/backgorundChat.jpg';

import SendIcon from '@mui/icons-material/Send';

const mainBox = {
  display: 'flex',
  justifyContent: 'center',
  backgroundImage: `url(${backgroundChat})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  gap: 5,
  marginTop: 15,
  padding: '5px 25px 2px 25px',
  borderRadius: '10px',

};

const userBox = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  background: '#FFFFFF',
  width: '300px',
  height: '500px',
  padding: '10px 8px 10px 8px',
  borderRadius: '10px',
  border: '1px solid #e0e0e0',
};

const chatBox = {
  display: 'flex',
  alignItems: 'flex-end',
  background: '#FFFFFF',
  width: '600px',
  height: '500px',
  padding: '10px 15px',
  borderRadius: '10px',
  border: '1px solid #e0e0e0',
};

const Chat: React.FC = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={mainBox}>
          <Box sx={userBox}>
            <b>Mikhail Sergeev</b>
            <b>Sergej Viktorovich</b>
            <b>Pavlov Gena</b>
          </Box>
          <Box>
            <Box sx={chatBox}>
              <b>Mikhail Sergeev:</b> Some sending message
            </Box>
            <Box
              component="form"
              display="flex"
              justifyContent="space-between"
              padding="5px 0 5px 0">
              <TextField sx={{width: '480px', background: '#FFFFFF', borderRadius: "5px"}}/>
              <Button variant="contained" endIcon={(<SendIcon/>)}>SEND </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Chat;