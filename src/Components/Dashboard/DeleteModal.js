import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../pages/MainPage.css'


function DeleteModal(props) {
    const customStyles = {
        header: {
          backgroundColor: '#3b518c',
          color: '#fff',
          borderBottom: 'none',
        },
        body: {
          fontSize: '18px',
          lineHeight: '2',
          backgroundColor: '#efefef'
        },
        footer: {
          borderTop: 'none',
          backgroundColor: '#efefef'
        },
        closeButton: {
          color: '#fff',
          backgroundColor: '#3b518c',
          border: 'none'
        },
        deleteButton: {
          color: '#fff',
          backgroundColor: '#3b518c',
          border: 'none'
        },
      };
    
    return (
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onConfirmDelete={props.onConfirmDelete} 
      className="custom-modal-class"
    >
      <Modal.Header closeButton style={customStyles.header}>
        <Modal.Title id="contained-modal-title-vcenter" style={customStyles.closeButton}>
        Delete Data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={customStyles.body}>
        <p>Are you sure you want to delete this data?</p>
      </Modal.Body>
      <Modal.Footer style={customStyles.footer}>
        <Button onClick={props.onConfirmDelete} style={customStyles.deleteButton} className="custom-delete-button-class">Yes</Button>
        <Button onClick={props.onHide} style={customStyles.closeButton} className="custom-close-button-class">Close</Button>
      </Modal.Footer>
    </Modal>
    );
}

export default DeleteModal
