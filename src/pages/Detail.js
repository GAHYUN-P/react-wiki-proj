import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BasicModal from "../components/Modal";
import Button from "@mui/material/Button";
import Comment from "../components/Comments";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

function Detail() {
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);
  console.log(comment_list);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [modify, setModify] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      comment_writer: "",
      comment_desc: "",
    },
  });

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

  useEffect(async () => {
    await axios.get("http://3.36.62.222/comment/1").then((res) => {
      console.log(res);
    });
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

  const onValid = (data) => {
    console.log(data);
    dispatch(commentActions.addComment(data));
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
      <form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="comment">댓글</label>
        <input
          {...register("comment_desc", {
            required: "입력해주세요",
            minLength: {
              value: 10,
              message: "댓글은 최소 10자 이상이어야 합니다.",
            },
          })}
          id="comment"
          placeholder="댓글"
        ></input>
        <span>{errors?.comment_desc?.message}</span>
        <input
          {...register("comment_writer", {
            required: "작성자를 입력해주세요",
            pattern: {
              message: "영문, 숫자만 가능합니다.",
            },
          })}
          placeholder="작성자"
        ></input>
        <span style={{ color: "red", fontSize: "10px" }}>
          {errors?.comment_writer?.message}
        </span>
        <Button>작성</Button>
      </form>
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
