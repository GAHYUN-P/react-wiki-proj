import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BasicModal from "../components/Modal";
import Button from "@mui/material/Button";
import Comments from "../components/Comments";
import CommentWrite from "../components/CommentWrite";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config";
import CommentWrite from "../components/CommentWrite";
import Like from "../components/Like";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as commentActions } from "../redux/modules/comment";
import TextField from "@mui/material/TextField";
import Header from "../shared/Header";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

function Detail(props) {
  let { id } = useParams();

  const dispatch = useDispatch();
  const [post, setPost] = useState({});
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
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
      <Header />
      <Stack spacing={4}>
        <Typography variant="h2">{post.title}</Typography>
        <h1>{post.writer}</h1>
        <div>
          <label htmlFor="desc"></label>
          {modify ? (
            <>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "60ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="본문"
                  value={desc}
                  readOnly={modify}
                  multiline
                  id="desc"
                ></TextField>
              </Box>
            </>
          ) : (
            <>
              <form>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": {
                      m: 1,
                      width: "50ch",
                      marginBottom: "20px",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    onChange={handleChange}
                    readOnly={modify}
                    multiline
                    id="desc"
                    defaultValue={desc}
                  ></TextField>
                </Box>
                <TextField
                  style={{ width: "50ch" }}
                  id="outlined-basic"
                  value={writer}
                  label="writer"
                  onChange={handleWriterChange}
                  variant="outlined"
                  placeholder="contributor"
                />
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
          <BasicModal id={id}>삭제</BasicModal>
        </div>
      </Stack>
    </>
  );
}

//지워도되는 디폴트 스테이트

export default Detail;
