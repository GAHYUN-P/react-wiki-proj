import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BasicModal from "../components/Modal";
import Button from "@mui/material/Button";
import Comments from "../components/Comments";
import CommentWrite from "../components/CommentWrite";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config";
import Like from "../components/Like";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as commentActions } from "../redux/modules/comment";

function Detail(props) {
  let { id } = useParams();
  const _comment = useSelector((state) => state.comment.list);

  const dispatch = useDispatch();
  const [post, setPost] = useState({});
  const [modify, setModify] = useState(true);
  const [desc, setDesc] = useState(post.desc);
  const [writer, setWriter] = useState("");

  const handleModify = (desc) => {
    setModify((prev) => !prev);
    if (modify === false) {
      if (writer.length === 0) {
        window.alert("작성자를 입력해주세요");
        return;
      }

      if (desc === post.desc) {
        window.alert("변동사항이 없습니다.");
        return;
      }

      axiosInstance.post(`/post/${id}`, {
        desc: desc,
        contributor: writer,
      });
    }
  };

  const handleWriterChange = (e) => {
    setWriter(e.target.value);
  };

  const handleChange = (e) => {
    setDesc(e.target.value);
  };

  useEffect(async () => {
    await axiosInstance.get(`/post/${id}`).then((res) => {
      setPost(res.data);
      setDesc(res.data.desc);
      dispatch(commentActions.setComment(res.data.comments));
      dispatch(postActions.setOnePost(res.data));
    });
  }, [_comment]);

  return (
    <>
      <h1>{post.title}</h1>
      <h1>{post.writer}</h1>
      <div>
        <label htmlFor="desc">설명</label>
        {modify ? (
          <>
            <TextareaForDesc
              value={desc}
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
        <CommentWrite id={id} />
      </div>

      <div>
        {_comment.map((e, i) => {
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
