import React from 'react'
import '../pages/MainPage.css';

const faqs = [
  {
    id: 1,
    question: "Can I upload multiple documents at once?",
    answer: "Currently, the system is designed to accept and process documents one at a time. Please upload each file individually for the most efficient handling."
  },
  {
    id: 2,
    question: "How can I update my profile information?",
    answer: "To update your profile, navigate to the 'Edit Profile' section. Here, you can modify details such as name, email, phone number, address, and profile picture."
  },
  {
    id: 3,
    question: "What file types are supported for document uploads?",
    answer: "We support a variety of file types, including PDF, Word documents (DOCX), Excel spreadsheets (XLS/XLSX), and images (JPEG, PNG). Ensure your files adhere to the supported formats."
  },
  {
    id: 4,
    question: "How can I view my uploaded documents?",
    answer: "You can view your uploaded documents in the 'View Data' section. This area displays a list of all your uploaded files along with relevant details."
  },
  {
    id: 5,
    question: "Can I customize the appearance of my uploaded documents?",
    answer: "Yes, you have the flexibility to select specific fields for display. The system allows you to tailor the view according to your preferences. Simply choose the desired fields, and only those selected fields will be visible. You can save this customized view for future use."
  },
  {
    id: 6,
    question: "How can I upload handwritten documents?",
    answer: "o upload handwritten documents, navigate to the respective section and use the 'Upload Handwritten Data' feature. Select the handwritten document file from your device, and the system will process it accordingly."
  },
  {
    id: 7,
    question: "Can I edit the data associated with my uploaded documents?",
    answer: "Absolutely! You can easily edit the details of your uploaded documents. Visit the 'Edit Data' section, choose the document you wish to modify, and update the necessary fields. Save the changes, and the document data will be promptly updated."
  },
]

function Faq() {
  return (
    <div className='cont-text'>
      <h2>FAQs</h2>
      
      <div className="faqs">
        {
          faqs.map((doc) => (
            <div key={doc.id} className="faq">
              <div className="ques">
                <p>{doc.id}. {doc.question}</p>
              </div>
              <div className="ans">
                <p>{doc.answer}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Faq
