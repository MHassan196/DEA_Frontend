import React from 'react'
import '../pages/MainPage.css';

const faqs = [
  {
    id: 1,
    question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, accusamus?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem maxime sint ea quaerat officiis odit corporis laborum cumque provident. Iusto Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, veniam."
  },
  {
    id: 2,
    question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, accusamus?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem maxime sint ea quaerat officiis odit corporis laborum cumque provident. Iusto Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, veniam."
  },
  {
    id: 3,
    question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, accusamus?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem maxime sint ea quaerat officiis odit corporis laborum cumque provident. Iusto Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, veniam."
  },
  {
    id: 4,
    question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, accusamus?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem maxime sint ea quaerat officiis odit corporis laborum cumque provident. Iusto Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, veniam."
  },
  {
    id: 5,
    question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, accusamus?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem maxime sint ea quaerat officiis odit corporis laborum cumque provident. Iusto Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, veniam."
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
