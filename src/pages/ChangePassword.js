import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useSnackbar } from 'notistack';
import APIService from '../Components/APIService';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { enqueueSnackbar } = useSnackbar()


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await APIService.ChangePassword({
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        });
  
        if (response.error) {
          // Display error message using enqueueSnackbar
          enqueueSnackbar(response.error, { variant: 'error' });
        } else {
          // Display success message using enqueueSnackbar
          enqueueSnackbar('Password updated successfully!', { variant: 'success' });
        }
      } catch (error) {
        // Handle unexpected errors and display error message
        console.error('Error changing password:', error.message);
        enqueueSnackbar('An unexpected error occurred. Please try again.', { variant: 'error' });
      }

  };

  return (
    <div className=" cont-text container mt-4">
      <h2 className='mb-4'>Change Password</h2>
      <Form onSubmit={handleSubmit} className='changepass'>
        <Form.Group controlId="currentPassword" className='mb-3'>
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="newPassword" className='mb-3'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className='mb-4'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>


        <Button variant="secondary" type="submit">
          Change Password
        </Button>
      </Form>
    </div>
  );
};

export default ChangePassword;