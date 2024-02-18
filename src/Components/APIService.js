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


  static uploadDataAPI = (formData) => {
    return fetch('http://127.0.0.1:8000/main_api/upload/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Data upload failed');
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });
  };

  static uploadImageAPI = (formData) => {
    return fetch('http://127.0.0.1:8000/main_api/upload/image/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });
  };

  static fetchExtractedData = () => {
    return fetch('http://127.0.0.1:8000/main_api/fetch_extracted_data/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
    }).then(response => response.json());
  };
  
  static fetchDocumentData = (collectionName) => {
    return fetch(`http://127.0.0.1:8000/main_api/fetch_collection_data/${collectionName}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
    }).then(response => response.json());
  };


  // static updateDocumentData = (id, updatedData) => {
  //   // const token = localStorage.getItem('token');
  //   return fetch(`http://127.0.0.1:8000/main_api/update_document/${id}/`, {
  //       method: 'PATCH',
  //       headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Token ${localStorage.getItem('token')}`,
  //       },
  //       body: JSON.stringify({ updatedData }),
  //   }).then(response => {
  //       if (response.ok) {
  //           return response.json();
  //       }
  //       throw new Error('Failed to update document data');
  //   });
  // };

  static updateDocumentData = (id, updatedData) => {
    const token = localStorage.getItem('token');
    const formattedData = JSON.stringify(updatedData.map(item => ({ ...item }))); // Ensure each item is a separate object
    return fetch(`http://127.0.0.1:8000/main_api/update_document/${id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: formattedData,
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to update document data');
    });
};

static deleteDocument = (documentId) => {
  const token = localStorage.getItem('token');
  return fetch(`http://127.0.0.1:8000/main_api/delete_document/${documentId}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  }).then(response => response.json());
};

  
  // static updateCustomizeData = (id, updatedData) => {
  //   // const token = localStorage.getItem('token');
  //   return fetch(`http://127.0.0.1:8000/main_api/customize_document/${id}/`, {
  //       method: 'PATCH',
  //       headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Token ${localStorage.getItem('token')}`,
  //       },
  //       body: JSON.stringify({ updatedData }),
  //   }).then(response => {
  //       if (response.ok) {
  //           return response.json();
  //       }
  //       throw new Error('Failed to update document data');
  //   });
  // };

  static uploadHandwrittenAPI = (formData) => {
    return fetch('http://127.0.0.1:8000/handwriting_recognition/process_image/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });
  };


  static fetchHandwrittenData = () => {
    return fetch('http://127.0.0.1:8000/handwriting_recognition/fetch_handwritten_data/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
    }).then(response => response.json());
  };

  static updateHandwrittenDocument = (id, updatedData) => {
    const token = localStorage.getItem('token');
    return fetch(`http://127.0.0.1:8000/handwriting_recognition/update_handwritten_data/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(updatedData),
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to update handwritten document data');
    });
  };

  static deleteHandwrittenDocument = (documentId) => {
    const token = localStorage.getItem('token');
    return fetch(`http://127.0.0.1:8000/handwriting_recognition/delete_hand_document/${documentId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    }).then(response => response.json());
  };

}



