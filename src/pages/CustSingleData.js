import React, { useState, useEffect } from 'react'
import { Table, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../pages/MainPage.css'
function CustSingleData() {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    useEffect(() => {
        const generateDummyData = () => {
            let dummyData = [];
            for (let i = 1; i <= 45; i++) {
                dummyData.push({
                    id: i,
                    name: `User ${i}`,
                    email: `user${i}@example.com`,
                    age: Math.floor(Math.random() * 30) + 20,
                });
            }
            return dummyData;
        };

        const dummyData = generateDummyData();
        setData(dummyData);
    }, []);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
            <div className='cont-text'>
                {/* Your ViewData content goes here */}
                <div className="dataHead">
                    <div>
                    <h2>Sales Data</h2>
                    </div>
                    <div className="dataOptions">
                        <button className="downloadBtn">
                            <i className="fas fa-download"></i>
                        </button>
                        
                    </div>
                </div>


                <div className="mt-4">
                    <Table striped bordered hover variant="dark" className="custom-table" >
                        <thead class="table-secondary">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody >
                            {currentRecords.map((record) => (
                                <tr key={record.id}>
                                    <td>{record.id}</td>
                                    <td>{record.name}</td>
                                    <td>{record.email}</td>
                                    <td>{record.age}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination className="justify-content-center custom-pagination mt-4">
                        {Array.from({ length: Math.ceil(data.length / recordsPerPage) }, (_, i) => (
                            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)} className="custom-page-item">
                                {i + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>
        </div>
  )
}

export default CustSingleData
