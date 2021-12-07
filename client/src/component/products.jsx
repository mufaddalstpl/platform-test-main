import React from 'react'
import { Spinner } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import './csvUpload.css'
const Products = ({ handleChange, importCSV, csvFile, isValidateLoading }) => {
  return (
    <div>
      {/* Products Csv Upload Section */}
      <div className="file-upload">
        <div className="file-select">
          <div className="file-select-button" id="fileName">
            Choose CSV File
          </div>
          <div className="file-select-name" id="noFile">
            {csvFile ? csvFile.name : 'No file chosen...'}
          </div>
          <input type="file" accept={'.csv'} name="chooseFile" id="chooseFile" onChange={handleChange} />
        </div>
      </div>
      <p />
      {/* API Calling when CSV files loads */}
      <Button disabled={!csvFile ? true : isValidateLoading ? true : false} onClick={importCSV}>
        {' '}
        {isValidateLoading ? (
          <>
            {' '}
            <Spinner animation="border" variant="light" size="sm"/> Validating...
          </>
        ) : (
          'Validate'
        )}
      </Button>
    </div>
  )
}

export default Products
