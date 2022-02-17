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
import Like from "../components/Like";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as commentActions } from "../redux/modules/comment";
import TextField from "@mui/material/TextField";
import Header from "../shared/Header";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Contributor from "../components/Contributor";

function Detail(props) {
  let { id } = useParams();

  const _comment = useSelector((state) => state.comment.list);

  const dispatch = useDispatch();
  const [post, setPost] = useState({});
  const [modify, setModify] = useState(true);
  const [desc, setDesc] = useState(post.desc);
  const [writer, setWriter] = useState("");

  const handleModify = () => {
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
      dispatch(postActions.setOnePost(res.data));
      dispatch(commentActions.setComment(res.data.comments));
    });
  }, []);

  return (
    <>
      <Stack marginTop={0}>
        <Header />
      </Stack>
      <Stack marginTop={15} spacing={4}>
        <Contributor post={post} marginTop={20} />
        <Typography variant="h3">{post.title}</Typography>
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
                  value={desc}
                  readOnly={modify}
                  multiline
                  id="desc"
                ></TextField>
              </Box>
            </>
          ) : (
            <>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    width: "60ch",
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
                  label="desc"
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
            </>
          )}
        </div>
        <Stack>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <Button onClick={handleModify}>수정</Button>
            <BasicModal id={id}>삭제</BasicModal>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              flexDirection: "row",
              fontSize: "20px",
            }}
          >
            <Like id={id} {...post} />
          </div>
        </Stack>
        <Stack>
          <CommentWrite id={id} />
        </Stack>

        <div style={{ marginBottom: "40px" }}>
          {_comment.map((e, i) => {
            return <Comments key={i} {...e} />;
          })}
        </div>
      </Stack>
    </>
  );
}

//지워도되는 디폴트 스테이트

export default Detail;
