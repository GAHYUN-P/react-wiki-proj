import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

function CommentWrite(props) {
  let id = props.id;
  const dispatch = useDispatch();
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

  const comment = useSelector((state) => state.comment.list);

  const onValid = (data) => {
    dispatch(
      commentActions.addCommentDB(id, data.comment_desc, data.comment_writer)
    );
  };

  return (
    <>
      <form>
        <label htmlFor="comment">댓글</label>
        <input
          {...register("comment_desc", {
            required: "내용을 입력해주세요",
            minLength: {
              value: 10,
              message: "댓글은 최소 10자 이상이어야 합니다.",
            },
          })}
          id="comment"
          placeholder="댓글"
        ></input>
        <span style={{ color: "red", fontSize: "10px" }}>
          {errors?.comment_desc?.message}
        </span>
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
        <Button onClick={handleSubmit(onValid)}>작성</Button>
      </form>
    </>
  );
}

export default CommentWrite;
