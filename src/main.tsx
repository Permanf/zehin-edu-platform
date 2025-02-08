import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './styles/index.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import store from './store/index.ts';

const theme = createTheme({
  colors: {
    'primary-blue': ['#4772EF', '#4772EF', '#4772EF', '#4772EF', '#4772EF', '#4772EF', '#4772EF', '#4772EF', '#4772EF', '#4772EF'],
  },
  primaryColor: 'primary-blue',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <MantineProvider theme={theme}>
      <ModalsProvider>
        <App />
        <Notifications position="top-right" zIndex={2077} />
      </ModalsProvider>
      </MantineProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
