import React, {useState} from 'react'
import { Card, Form, Row, Button, Col } from "react-bootstrap";
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
        <Form className="mt-3 text-center mb-4 row">
          <div class="col-sm-20">
            <Button type="button" className="btn btn-primary" onClick={handleClick}>+</Button>
            <form>
              <div>
                {plusButton && (
                  <CertificateEditForm></CertificateEditForm>
                )}
              </div>
            </form>
          </div>  
        </Form>
      </Card.Body>

    </Card>
  )
}

export default Certificate