import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useHistory } from "react-router-dom";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {Grid} from "../elements";

function CommentWrite(props) {
  let id = props.id;
  const dispatch = useDispatch();
  const history = useHistory();
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

  const onValid = (data) => {
    dispatch(
      commentActions.addCommentDB(id, data.comment_desc, data.comment_writer)
    );
    history.go(`/detail/${id}`);
  };

  return (
    <>
      
      <form>
        <Grid is_flex padding="0px 100px 0px 100px">
        <Stack style={{ display: "flex", justifyContent: "center" }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "51ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              {...register("comment_desc", {
                required: "내용을 입력해주세요",
                minLength: {
                  value: 5,
                  message: "댓글은 최소 10자 이상이어야 합니다.",
                },
              })}
              multiline
              label="댓글"
              id="comment"
              placeholder="댓글"
            ></TextField>
            <span style={{ color: "red", fontSize: "10px" }}>
              {errors?.comment_desc?.message}
            </span>
          </Box>
        </Stack>
        <Stack>
          <Grid is_flex>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "20ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              {...register("comment_writer", {
                required: "작성자를 입력해주세요",
                pattern: {
                  message: "영문, 숫자만 가능합니다.",
                },
              })}
              label="작성자"
            ></TextField>
            <span style={{ color: "red", fontSize: "10px" }}>
              {errors?.comment_writer?.message}
            </span>
          </Box>
          <Button onClick={handleSubmit(onValid)}>작성</Button>
          </Grid>
          
        </Stack>
        </Grid>
      </form>
    </>
  );
}

export default CommentWrite;
