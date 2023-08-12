import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import AuthForm from '../components/AuthForm/AuthForm';
import { userSlice } from '../../../store/user/user.slice';
import { configureStore } from '@reduxjs/toolkit';
// import { useAuth } from '../../../hooks/useAuth';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { persistor, store } from '../../../store/store';
import AuthProvider from '../provider/AuthProvider';
import { PersistGate } from 'redux-persist/integration/react';

describe('AuthForm', () => {
  const store = configureStore({
    reducer: {
      user: userSlice.reducer
    }
  });

  test('check initial state', () => {
    const initialState = store.getState().user;
    expect(initialState.type).toBe('login');
    expect(initialState.user).toBe(null);
    expect(initialState.email).toBe('');
    expect(initialState.errorMessage).toBe('');
    expect(initialState.message).toBe('');
  });

  test('login process', async () => {
    const store = configureStore({
      reducer: {
        user: userSlice.reducer,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthForm />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByTestId('auth-btn');

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');

    await act(async () => {
      fireEvent.click(submitButton);
      // Add any assertions that should occur after the login process, such as checking if the user state was updated as expected.
    });
  });

  // test('validation process', async () => {
  //   render(
  //     <BrowserRouter>
  //       <Provider store={store}>
  //         <AuthProvider>
  //           <PersistGate loading={null} persistor={persistor}>
  //             <AuthForm />
  //           </PersistGate>
  //         </AuthProvider>
  //       </Provider>
  //     </BrowserRouter>
  //   );
  
  //   const registerButton = screen.getByTestId('register-btn');
  //   await act(async () => {
  //     await userEvent.click(registerButton);
  //   });
  
  //   const userExId = screen.getByTestId('userExId');
  //   const phone = screen.getByTestId('phone');
  //   await act(async () => {
  //     userEvent.type(userExId, '123');
  //     userEvent.type(phone, '0503036307');
  //   });
  
  // const authBtn = screen.getByTestId('auth-btn');
  // await act(async () => {
  //   await userEvent.click(authBtn);
  // });

  // // TODO change between chane state to async 
  // await act(async () => {
  //   store.dispatch(userSlice.actions.setType('register'));
  // });


  // const email = screen.getByTestId('email');
  // const firstName = screen.getByTestId('firstName');
  // const lastName = screen.getByTestId('lastName');
  // const password = screen.getByTestId('password');
  // const findAgainAuthBtn = screen.getByTestId('auth-btn');

  // await act(async () => {
  //   userEvent.type(email, 'test@gmail.com');
  //   userEvent.type(firstName, 'ilya');
  //   userEvent.type(lastName, 'misyura');
  //   userEvent.type(password, '123');
  // });

  // await act(async () => {
  //   await userEvent.click(findAgainAuthBtn);
  // });

  // });

  test('login forms', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>
            <PersistGate loading={null} persistor={persistor}>
              <AuthForm />
            </PersistGate>
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    );
    const email = screen.getByTestId('email');
    const firstName = screen.getByTestId('password');
    
    expect(email).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
 
  })
  
  test('register forms', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>
            <PersistGate loading={null} persistor={persistor}>
              <AuthForm />
            </PersistGate>
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    );


    await act(async () => {
      store.dispatch(userSlice.actions.setType('register'));
    });


    const email = screen.getByTestId('email');
    const firstName = screen.getByTestId('firstName');
    const lastName = screen.getByTestId('lastName');
    const password = screen.getByTestId('password');
    
    expect(email).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  })

  test('validation forms', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>
            <PersistGate loading={null} persistor={persistor}>
              <AuthForm />
            </PersistGate>
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    );
    await act(async () => {
      store.dispatch(userSlice.actions.setType('validation'));
    });
    const userExId = screen.getByTestId('userExId');
    const phone = screen.getByTestId('phone');
    expect(userExId).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
  })

  test('forgot form', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>
            <PersistGate loading={null} persistor={persistor}>
              <AuthForm />
            </PersistGate>
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    );
    await act(async () => {
      store.dispatch(userSlice.actions.setType('forgotPassword'));
    });
    const email = screen.getByTestId('email');
    expect(email).toBeInTheDocument();
  })

  test('check navigation "back to login" in forgot forgot password page', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>
            <PersistGate loading={null} persistor={persistor}>
              <AuthForm />
            </PersistGate>
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    );
  
    const registerButton = screen.getByTestId('forgotPassword-btn');
    await act(async () => {
      await userEvent.click(registerButton);
    });
    const backToLogin = screen.getByTestId('backToLogin-btn');
    expect(backToLogin).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(backToLogin);
    });
    const newRegisterButton = screen.getByTestId('forgotPassword-btn');
    expect(newRegisterButton).toBeInTheDocument();

  })

});
