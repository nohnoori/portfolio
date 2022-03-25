import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Tag from "./Tag";

function JobVacancyAddForm({ setIsAdding, setJobs, portfolioOwnerId }) {
  const [jobname, setJobname] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(true);
  const [tagItem, setTagItem] = useState("");
  const [tags, setTags] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const companyId = portfolioOwnerId;

    await Api.post("jobVacancy", {
      company_id: companyId,
      jobname,
      description,
      open,
      tags,
    });

    await Api.get("jobVacancies", companyId).then((res) => setJobs(res.data));

    setIsAdding(false);
  };
  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      e.preventDefault();
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    let updatedTagList = [...tags];
    updatedTagList.push(tagItem);
    setTags(updatedTagList);
    setTagItem("");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Control
          className="mb-2"
          type="text"
          placeholder="채용공고 제목"
          value={jobname}
          onChange={(e) => setJobname(e.target.value)}
        />
        <textarea
          style={{
            width: "100%",
            height: "200px",
            padding: "10px",
            margin: "auto",
            resize: "none",
            fontSize: "15px",
            borderRadius: "6px",
            border: "solid 1px #d2d2d2",
          }}
          className="mb-2"
          type="description"
          placeholder="채용 공고 내용을 넣어주세요(ex.업무소개, 우대사항)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div key={`inline-radio`} className="mb-3 mt-3">
          <Form.Check
            inline
            label="채용중"
            id="radio1"
            type="radio"
            name="open"
            value={true}
            onChange={(e) => setOpen(e.target.value)}
          />
          <Form.Check
            inline
            label="채용 마감"
            id="radio2"
            type="radio"
            name="open"
            value={false}
            onChange={(e) => setOpen(e.target.value)}
          />
        </div>
        <div>
          {tags.map((currentTag) => (
            <Tag
              key={currentTag}
              currentTag={currentTag}
              tags={tags}
              setTagList={setTags}
            />
          ))}
          <Form.Control
            style={{ margin: "5px" }}
            type="text"
            placeholder="Press enter to add tags"
            onChange={(e) => setTagItem(e.target.value)}
            value={tagItem}
            onKeyPress={onKeyPress}
          />
        </div>

        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            <Button variant="primary" type="submit" className="me-3">
              확인
            </Button>
            <Button variant="secondary" onClick={() => setIsAdding(false)}>
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form.Group>
    </Form>
  );
}
export default JobVacancyAddForm;
