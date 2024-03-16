import { Box, Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from './features/users/RegisterForm';
import LoginForm from './features/users/LoginForm';
import PageNoFoundPicture from '../../frontend/src/assets/pic/404PageNotFound.jpg';

import Layout from './components/Layout/Layout';

function App() {

  return (
      <Layout>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={(<LoginForm/>)}/>
            <Route path="/login" element={(<LoginForm/>)}/>
            <Route path="/register" element={(<RegisterForm/>)}/>
            <Route path="*" element={(
              <Box
                sx={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginTop: '50px'
                }}>
                <Box component="img"
                     sx={{width: '50rem', height: '50rem'}}
                     src={PageNoFoundPicture}
                     alt="Page Not Found"/>
              </Box>
            )}/>
          </Routes>
        </Container>
      </Layout>
  );
}

export default App;