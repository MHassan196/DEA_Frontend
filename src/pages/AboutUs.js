import React from 'react'
import '../pages/MainPage.css';

function AboutUs() {
  return (
    <div className="cont-text">
      <h2>About Us</h2>

      <div className="aboutusPage">
        <div className="abt-upper">
          <div className="vision">
            <div className="vision-head">
              <h3>Our Vision</h3>
            </div>

            <div className="vision-text">
              <p>
                Our vision is to redefine data entry processes by leveraging cutting-edge AI technologies, streamlining workflows, and eliminating the challenges associated with manual data entry.
              </p>

            </div>
          </div>
          <div className="vision bg">
            <div className="vision-head">
              <h3>Our Background</h3>
            </div>
            <div className="vision-text">
              <p>
                In today's data-driven world, we recognize the inefficiencies and errors stemming from traditional manual data entry methods. These methods often result in increased processing time, data inaccuracies, and soaring operational costs. Hence, Data Entry Automation was conceived to revolutionize this landscape.
              </p>

            </div>
          </div>
        </div>
        <div className="abt-lower">
          <div className="scope">
            <div className="vision-head">
              <h3>Our Scope</h3>
            </div>
            <div className="vision-text">
              <p>
                Our primary objective is to develop an intuitive and robust data entry automation system capable of extracting data from diverse sources like spreadsheets, images, and PDFs. By harnessing the power of AI, our system will intelligently interpret and structure this data into a standardized format, eliminating human error and ensuring data consistency.
              </p>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AboutUs
