import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BasicModal from "../components/Modal";
import Button from "@mui/material/Button";
import Comment from "../components/Comments";

function Detail() {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [modify, setModify] = useState(true);

  const handleLikeClick = () => {
    setLike((prev) => !prev);
    console.log(like);
  };

  const handleDislikeClick = () => {
    setDislike((prev) => !prev);
    console.log(dislike);
  };

  // 수정버튼 누르면 axios로 db에 전달.
  const handleModify = () => {
    setModify((prev) => !prev);
    if (modify === false) {
      console.log("axios");
      return;
      // axios로 db에 보내주기 desc, contributor
    }
  };

  useEffect(() => {
    //axios로 처음에 받기
    if ((like && dislike) || (!like && !dislike)) {
      return 0;
      //axios로 0 보내주기
    } else if (like === true && dislike === false) {
      return 1;
    } else {
      return -1;
    }
  }, []);

  const handleComment = () => {
    console.log("axios");
  };

  return (
    <>
      <h1>{defaultState.title}</h1>
      <h1>{defaultState.writer}</h1>
      <div>
        <label htmlFor="desc">설명</label>
        {modify ? (
          <>
            <TextareaForDesc
              value={defaultState.desc}
              readOnly={modify}
              id="desc"
            ></TextareaForDesc>
          </>
        ) : (
          <>
            <TextareaForDesc readOnly={modify} id="desc">
              {defaultState.desc}
            </TextareaForDesc>
            <input placeholder="contributor"></input>
          </>
        )}
      </div>
      {/* 좋아요 기능 */}
      <div style={{ display: "flex", justifyContent: "left" }}>
        <div>{defaultState.likes}</div>
        <div onClick={handleLikeClick}>like</div>
        <div onClick={handleDislikeClick}>disLike</div>
      </div>
      <div>
        <label htmlFor="comment">댓글</label>
        <textarea id="comment" placeholder="댓글"></textarea>
        <input placeholder="작성자"></input>
        <Button onClick={handleComment}>작성</Button>
      </div>
      {/* 댓글창 */}

      <div>
        {defaultState.comments.map((e, i) => {
          return <Comment {...e} />;
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "right" }}>
        <Button onClick={handleModify}>수정</Button>
        <BasicModal>삭제</BasicModal>
      </div>
    </>
  );
}

const TextareaForDesc = styled.textarea`
  background-color: ${(props) => (props.readOnly ? "whitesmoke" : "white")};
`;
//지워도되는 디폴트 스테이트
const defaultState = {
  post_id: "post_id",
  title: "title",
  writer: "writer",
  category: "category",
  modifiedAt: "modifiedAt",
  likes: "likes",
  desc: "desc",
  password: "123",
  contributors: ["name", "jeyeol"],
  comments: [
    {
      comment_writer: "jeyeol",
      comment_desc: "abc",
      createdAt: "2020-20-12",
    },
    {
      comment_writer: "gahyeon",
      comment_desc: "ab",
      createdAt: "2020-12-12",
    },
  ],
};

export default Detail;
