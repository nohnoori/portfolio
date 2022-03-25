import { Button, Form, Col, Row } from "react-bootstrap";
import "./Tag.css";
function tag({ currentTag, tags, setTagList, isJobVancancyCard }) {
  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tags.filter((tagItem) => tagItem !== deleteTagItem);
    setTagList(filteredTagList);
  };
  return (
    <>
      {isJobVancancyCard ? (
        <span id="body">
          <span id="tag">{currentTag}</span>
        </span>
      ) : (
        <span id="body">
          <span id="tag">{currentTag}</span>
          <Button id="button" size="sm" onClick={deleteTagItem}>
            X
          </Button>
        </span>
      )}
    </>
  );
}
export default tag;
