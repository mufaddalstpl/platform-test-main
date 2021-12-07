import React from 'react'
import { Card } from 'react-bootstrap'
import noImage from '../assets/no-pictures.png'
import './csvUpload.css'
const Results = ({ resultData }) => {
  return (
    <div className={'result-cards'}>
      {/* Results Array Iteration */}
      {resultData &&
        resultData.map((data, index) => {
          return (
            <Card key={`Cards-${index}`} className={'mb-3'}>
              <Card.Body>
                <div className={'d-flex justify-content-between'}>
                  <div className={`${!data.error ? 'test-result-sucess' : 'test-result-error marginRight'}`}>
                    {!data.error ? 'Ok' : 'KO'}
                  </div>
                  <div className={data.error ? 'marginRight' : ''}>{data?.id ? data.id : 'ID'}</div>
                  <div className={data.error ? 'maxWidth' : ''}>
                    {!data.error ? (data?.name ? data.name : 'ID') : data.error}
                  </div>
                  <div>
                    {!data.error ? (
                      <img src={data.url ? data.url : noImage} alt={'ImageData Not Found'} width={100} />
                    ) : null}
                  </div>
                </div>
              </Card.Body>
            </Card>
          )
        })}
    </div>
  )
}

export default Results
