import { useNavigate } from "react-router-dom";
import { Card, Row } from "react-bootstrap";
import "../jobvancacy/Tag.css";
import Tag from "../jobvancacy/Tag";

function CompanyCard({ company, isCompanyNetwork }) {
  const navigate = useNavigate();
  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src={company.img}
            alt="회사 로고"
          />
        </Row>
        <Card.Title>{company?.jobname}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {company?.description}
        </Card.Subtitle>
        <Card.Text>{company?.open ? "채용중" : "채용 마감"}</Card.Text>
        <Card.Text>
          {company?.tags.map((currentTag) => (
            <Tag
              className="m-2"
              key={currentTag}
              currentTag={currentTag}
              tags={company?.tags}
              isJobVancancyCard
            />
          ))}
        </Card.Text>

        {isCompanyNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/companys/${company.id}`)}
          >
            공고상세보기
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default CompanyCard;
