import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import CertificateEditForm from "./CertificateEditForm"

function Certificate() {
  const [ plusButton, setPlusButton ] = useState(false)
  const handleClick = () => {
    setPlusButton(!plusButton)
  }
  return (
    <Card>
      <Card.Body>
        <Card.Title>자격증</Card.Title>  
        <div class="mt-3 text-center mb-4 row">
          <div class="col-sm-20">
            <button type="button" class="btn btn-primary" onClick={handleClick}>+</button>
            <form>
              <div>
              {plusButton && ( <>
                  <div class="mt-3">
                    <input type="text" class="form-control" placeholder="수상내역" />
                  </div>
                  <div class="mt-3">
                    <input type="text" class="form-control" placeholder="상세내역" />
                  </div>
                  <div class="mt-3 row">
                    <div class="react-datepicker__input-container"></div>
                  </div>
                </>
              )}
              <CertificateEditForm></CertificateEditForm>
              </div>
            </form>
          </div>  
        </div>
      </Card.Body>

    </Card>
  )
}

export default Certificate