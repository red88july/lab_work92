import React, { useEffect, useRef, useState } from 'react';
import { Alert, Box, Button, Container, TextField } from '@mui/material';
import backgroundChat from '../assets/pic/backgorundChat.jpg';

import SendIcon from '@mui/icons-material/Send';
import { ChatMessage, IncomingMessage } from '../types';
import { useAppSelector } from '../app/hooks.ts';
import { selectUser } from './users/usersSlice.ts';

const mainBox = {
  display: 'flex',
  justifyContent: 'center',
  backgroundImage: `url(${backgroundChat})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  gap: 5,
  marginTop: 2,
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
  overflow: 'scroll',
  flexDirection: 'column',
  background: '#FFFFFF',
  width: '600px',
  height: '440px',
  padding: '10px 15px',
  borderRadius: '10px',
  border: '1px solid #e0e0e0',
};

const Chat: React.FC = () => {

  const user = useAppSelector(selectUser);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messagesText, setMessagesText] = useState('');
  const [totalTry, setTotalTry] = useState(0);

  const ws = useRef<WebSocket | null>(null);

  const changeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessagesText(event.target.value);
  };

  const handleReconnect = () => {
    console.log('WS closed! Try reconnected');

    let tried = 0;

    const reconnect = setInterval(() => {
      ws.current = new WebSocket('ws://localhost:8000/chatApp');
      tried++;
      setTotalTry(tried);

      }, 2000);

    setTimeout(() => {
      clearInterval(reconnect);
      console.log('Stop reconnecting. WS closed!');
    }, 6000);
  };


  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/chatApp');

    ws.current.addEventListener('close', handleReconnect);

    ws.current.addEventListener('message', (event) => {
      const decodedMessage = JSON.parse(event.data) as IncomingMessage;

      if (decodedMessage.type === 'NEW_MESSAGE') {
        setMessages((prev) => [...prev, decodedMessage.payload]);
      }

      if (decodedMessage.type === 'WELCOME') {
        console.log(decodedMessage.payload);
      }
    });

    return () => {
      if (ws.current) {
        ws.current.close();

      }
    };
  }, []);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();

    if (!ws.current) return;
    ws.current.send(JSON.stringify({
      type: 'LOGIN',
      payload: user?.token,
    }));

    if (!ws.current) return;
    ws.current.send(JSON.stringify({
      type: 'SET_USERNAME',
      payload: user?.displayName,
    }));

    if (!ws.current) return;
    ws.current.send(JSON.stringify({
      type: 'SET_MESSAGE',
      payload: messagesText,
    }));

  };

  return (
    <>
      <Container maxWidth="lg">

        <Box marginTop={12}>
          {totalTry &&
            (<Alert severity="warning">
              {`Server is down.  Try to connect with server is ${totalTry}`}
            </Alert>)}
          <Box sx={mainBox}>
            <Box sx={userBox}>
              {messages.map((message, idx) => (
                <span key={idx}>
                  <b>{message.author}</b>
                </span>
              ))}
              {/*{user?.displayName}*/}
            </Box>
            <Box>
              <Box sx={chatBox}>
                {messages.map((message, idx) => (
                  <span key={idx}>
                  <b>{message.author}: </b>{message.message}
                </span>
                ))}
              </Box>
              <Box
                component="form"
                onSubmit={sendMessage}
                display="flex"
                justifyContent="space-between"
                padding="5px 0 5px 0">
                <TextField
                  value={messagesText}
                  onChange={changeMessage}
                  placeholder="Enter your message"
                  sx={{width: '480px', background: '#FFFFFF', borderRadius: '5px'}}
                />
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={(<SendIcon/>)
                  }>SEND </Button>

              </Box>
            </Box>
          </Box>
        </Box>

      </Container>
    </>
  );
};

export default Chat;