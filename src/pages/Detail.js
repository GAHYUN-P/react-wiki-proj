import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BasicModal from "../components/Modal";
import Button from "@mui/material/Button";
import Comments from "../components/Comments";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config";
import CommentWrite from "../components/CommentWrite";
import Like from "../components/Like";
import { actionCreators as postActions } from "../redux/modules/post";

function Detail(props) {
  let { id } = useParams();

  const dispatch = useDispatch();
  const [post, setPost] = useState({});
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [modify, setModify] = useState(true);
  const [desc, setDesc] = useState(post.desc);
  const [writer, setWriter] = useState("");

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
  const handleModify = (data) => {
    setModify((prev) => !prev);
    if (modify === false) {
      axiosInstance.post(`/post/${id}`, {
        desc: desc,
        contributor: writer,
      });
    }
  }; // axios로 db에 보내주기 desc, contributor

  const handleWriterChange = (e) => {
    setWriter(e.target.value);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setDesc(e.target.value);
  };

  useEffect(async () => {
    await axiosInstance.get(`/post/${id}`).then((res) => {
      setPost(res.data);
      dispatch(postActions.setOnePost(res.data));
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

  return (
    <>
      <h1>{post.title}</h1>
      <h1>{post.writer}</h1>
      <div>
        <label htmlFor="desc">설명</label>
        {modify ? (
          <>
            <TextareaForDesc
              value={post.desc}
              readOnly={modify}
              id="desc"
            ></TextareaForDesc>
          </>
        ) : (
          <>
            <form>
              <TextareaForDesc
                onChange={handleChange}
                readOnly={modify}
                id="desc"
                value={desc}
              ></TextareaForDesc>
              <input
                value={writer}
                onChange={handleWriterChange}
                placeholder="contributor"
              ></input>
            </form>
          </>
        )}
      </div>

      <div>
        <Like id={id} />
      </div>

      <div>
        <CommentWrite props={id} />
      </div>

      <div>
        {post.comments?.map((e, i) => {
          return <Comments key={i} {...e} />;
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

export default Detail;
