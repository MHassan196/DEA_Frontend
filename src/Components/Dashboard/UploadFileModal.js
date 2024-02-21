import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../pages/MainPage.css'


function UploadFileModal(props) {
    const customStyles = {
        header: {
          backgroundColor: 'rgba(155, 167, 196, 0.936)',
          color: '#fff',
          borderBottom: 'none',
        },
        body: {
          fontSize: '16px',
          lineHeight: '2',
          backgroundColor: '#efefef'
        },
        footer: {
          borderTop: 'none',
          backgroundColor: '#efefef'
        },
        closeButton: {
          color: '#fff',
          backgroundColor: 'rgba(155, 167, 196, 0.936)',
          border: 'none'
        },
      };
    
    return (
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={customStyles.header}>
        <Modal.Title id="contained-modal-title-vcenter" style={customStyles.closeButton}>
        User Guidelines
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={customStyles.body}>
        <ul>
          <li><strong>File Formats:</strong> Upload PDF, Word, Excel or Image files.</li>
          <li><strong>Data Extraction:</strong> System auto-extracts data; verify it in the dashboard.</li>
          <li><strong>Data Viewing:</strong> Use "View Data" to inspect and verify tabular data.</li>
          <li><strong>Customization:</strong> Customize data in "Customize Data" and save changes.</li>
          <li><strong>Editing Data:</strong> Correct errors in "Edit Data" and save for accuracy.</li>
          <li><strong>Image Files:</strong> Upload clear PNG or JPG images with tabular data.</li>
          <li><strong>Data Storage:</strong> Securely store extracted data in the database.</li>
          <li><strong>User Assistance:</strong> FAQ section and "Contact Us" for support.</li>
        </ul>
      </Modal.Body>
      <Modal.Footer style={customStyles.footer}>
        <Button onClick={props.onHide} style={customStyles.closeButton}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
}

export default UploadFileModal
