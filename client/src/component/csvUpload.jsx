import React, { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import Products from './products'
import Results from './results'
import { authInstance } from '../services/api'
import './csvUpload.css'

const CsvUpload = () => {
  //CSV File State for files upload
  const [csvFile, setCsvFile] = useState(null)

  //Storing Result data sending as props to result section
  const [resultData, setResultData] = useState(null)

  //Handling key for tabs
  const [key, setKey] = useState('products')

  //Loading Validate Api Response
  const [isValidateLoading, setIsValidateLoading] = useState(false)

  //Uplaod CSV file
  const handleChange = e => {
    const { files } = e.target
    setCsvFile(files[0])
  }

  //Send CSV file to backend
  const importCSV = async () => {
    const formData = new FormData()
    formData.append('file', csvFile)
    setIsValidateLoading(true)
    //Getting response from backend with applying axios
    const response = await authInstance.post(`/api/v1/upload`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    const { data } = response.data
    setResultData(data)
    setIsValidateLoading(false)
    setKey('results')
  }

  return (
    <div className="App">
      <header className="header">
        <nav className="nav">
          <div className="logo">Import & Upload CSV File!.</div>
        </nav>
      </header>
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)} className="mb-3">
        <Tab eventKey="products" title="Products">
          <Products
            handleChange={handleChange}
            importCSV={importCSV}
            csvFile={csvFile}
            isValidateLoading={isValidateLoading}
          />
        </Tab>
        <Tab eventKey="results" title="Results">
          <div className={'d-flex justify-content-center'}>
            <Results resultData={resultData} />
          </div>
        </Tab>
      </Tabs>
      <p />
    </div>
  )
}

export default CsvUpload
