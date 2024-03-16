import { Box, Container } from '@mui/material';
import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from './features/users/RegisterForm';
import LoginForm from './features/users/LoginForm';

function App() {

  return (
    <>
      <Layout>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={(<LoginForm />)}/>
            <Route path="/login" element={(<LoginForm />)}/>
            <Route path="/register" element={(<RegisterForm />)}/>
            {/*<Route path="/chat" element={(<Chat />)}/>*/}
            <Route path="*" element={(<Box><h4>Not Found!</h4></Box>)}/>
          </Routes>
        </Container>
      </Layout>
    </>
  );
}

export default App;
