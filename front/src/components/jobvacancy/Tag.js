import { Button } from "react-bootstrap";
import "./Tag.css";
function tag({ currentTag, tags, setTagList, isJobVacancyCard }) {
  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tags.filter((tagItem) => tagItem !== deleteTagItem);
    setTagList(filteredTagList);
  };
  return (
    <>
      {isJobVacancyCard ? (
        <span id="body">
          <span id="jobCard">{currentTag}</span>
        </span>
      ) : (
        <span>
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
