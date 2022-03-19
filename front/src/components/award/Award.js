/* eslint-disable react/prop-types */
import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

// - 각 Award 컴포넌트는 isEditing 상태에 따라, false면 AwardCard, true면 AwardEditForm이 됩니다.
// - isEditable(포트폴리오 소유자와 현재 로그인한 사용자가 일치할 때)이 true인 경우 편집 버튼이 생깁니다.

function Award({ isEditable, portfolioOwnerId, currentAward, setAward }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <AwardEditForm
          setIsEditing={setIsEditing}
          setAward={setAward}
          currentAward={currentAward}
        />
      ) : (
        <AwardCard
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          award={currentAward}
          portfolioOwnerId={portfolioOwnerId}
        />
      )}
    </>
  );
}

export default Award;
