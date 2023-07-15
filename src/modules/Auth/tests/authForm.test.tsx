import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import AuthForm from '../components/AuthForm/AuthForm';
import { AuthService } from '../../../services/auth/auth.service';
describe('AuthForm', () => {
  test('renders login form by default', () => {
    render(<AuthForm />);
    const loginHeading = screen.getByTestId('login-heading');
    expect(loginHeading).toBeInTheDocument();
  });

  test('switches to register form when register link is clicked', () => {
    render(<AuthForm />);
    const registerLink = screen.getByTestId('register-btn');
    fireEvent.click(registerLink);
    const firstNameInput = screen.getByPlaceholderText('firstName');
    const lastNameInput = screen.getByPlaceholderText('lastName');
    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
  });

  test('submits register form with correct data', () => {
    render(<AuthForm />);
    const registerLink = screen.getByTestId('register-btn');
    fireEvent.click(registerLink);
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const firstNameInput = screen.getByPlaceholderText('firstName');
    const lastNameInput = screen.getByPlaceholderText('lastName');
    const submitButton = screen.getByTestId('auth-btn');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.change(firstNameInput, { target: { value: 'Ilya' } });
      fireEvent.change(lastNameInput, { target: { value: 'Misyura' } });
      fireEvent.click(submitButton);
    });

    // Add your assertions for the submit handler here
  });


//   test('submits login form with correct data', () => {
//     render(<AuthForm />);
//     const emailInput = screen.getByPlaceholderText('email');
//     const passwordInput = screen.getByPlaceholderText('password');
//     const submitButton = screen.getByText('Login');

//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password' } });
//     fireEvent.click(submitButton);

//     // Add your assertions for the submit handler here
//   });


});
