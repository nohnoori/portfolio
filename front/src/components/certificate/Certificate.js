import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import CertificateEditForm from "./CertificateEditForm"
import CertificateCard from "./CertificateCard"

function Certificate() {
  const [ plusButton, setPlusButton ] = useState(false)
  const handleClick = () => {
    setPlusButton(!plusButton)
  }
  return (
    <Card>
      <Card.Body>
        <Card.Title>자격증</Card.Title>  
        <CertificateCard></CertificateCard>
        <div class="mt-3 text-center mb-4 row">
          <div class="col-sm-20">
            <button type="button" class="btn btn-primary" onClick={handleClick}>+</button>
            <form>
              <div>
                {plusButton && (
                  <CertificateEditForm></CertificateEditForm>
                )}
              </div>
            </form>
          </div>  
        </div>
      </Card.Body>

    </Card>
  )
}

export default Certificate