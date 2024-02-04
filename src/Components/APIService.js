export default class APIService {

  static RegisterUser = (body) => {
    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });
    return fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body: formData,
    })
    // .then((resp) => {
    //   if (!resp.ok) {
    //     throw new Error('Registration failed');

    //   }
    //   return resp;
    // })
    // .catch((error) => {
    //   throw error; // Rethrow the error to handle it in the handleSubmit function
    // });
  };

  static LoginUser = (body) => {
    return fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  };

  static LogoutUser = () => {
    // Make a POST request to the logout endpoint
    return fetch('http://127.0.0.1:8000/api/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include the authentication token in the request headers
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    }).then((resp) => resp.json());
  };

  static GetUserData = () => {
    return fetch('http://127.0.0.1:8000/api/get_user_profile/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`, // Include the user's token for authentication
      },
    }).then((response) => {
      if (response.ok) {
        return response.json(); // Return user data if the response is okay
      } else {
        throw new Error('Failed to fetch user data');
      }
    });
  };

  static UpdateUserData = (updatedData) => {
    const token = localStorage.getItem('token');
    return fetch('http://127.0.0.1:8000/api/update_user_profile/', {
      method: 'PUT', // Use PUT method for updating data
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(updatedData),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to update user data');
    });
  };
  

}