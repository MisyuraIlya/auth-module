import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AuthForm from '../components/AuthForm/AuthForm';

describe('AuthForm', () => {
  test('renders login form by default', () => {
    render(<AuthForm />);
    const loginHeading = screen.getByRole('heading', { name: 'Login' });
    expect(loginHeading).toBeInTheDocument();
  });

//   test('switches to register form when register link is clicked', () => {
//     render(<AuthForm />);
//     const registerLink = screen.getByText('Register');
//     fireEvent.click(registerLink);
//     const registerForm = screen.getByText('Register');
//     expect(registerForm).toBeInTheDocument();
//   });

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

//   test('submits register form with correct data', () => {
//     render(<AuthForm />);
//     const registerLink = screen.getByText('Register');
//     fireEvent.click(registerLink);
//     const emailInput = screen.getByPlaceholderText('email');
//     const passwordInput = screen.getByPlaceholderText('password');
//     const firstNameInput = screen.getByPlaceholderText('firstName');
//     const lastNameInput = screen.getByPlaceholderText('lastName');
//     const submitButton = screen.getByText('Register');

//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password' } });
//     fireEvent.change(firstNameInput, { target: { value: 'John' } });
//     fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
//     fireEvent.click(submitButton);

//     // Add your assertions for the submit handler here
//   });
});
