import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import axios from "axios";
import { axiosInstance } from "../config";
import Stack from "@mui/material/Stack";

function Like(props) {
  let id = props.id;
  const post = useSelector((state) => state.post.list);

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [error, setError] = useState("");
  const [like_value, setLike_value] = useState(post.likes);

  console.log(like_value);

  const handleLikeClick = () => {
    if (dislike) {
      setDislike(false);
    }
    setLike((prev) => !prev);
    setLike_value((prev) => post.likes + 1);
  };

  const handleDislikeClick = () => {
    if (like) {
      setLike(false);
    }
    setDislike((prev) => !prev);
    setLike_value((prev) => post.likes - 1);
  };

  useEffect(() => {
    if (like === true) {
      return axiosInstance.post(`/like/${id}`, { like_value: 1 });
    } else if (dislike === true) {
      return axiosInstance.post(`/like/${id}`, { like_value: -1 });
    }
    console.log(like, dislike);
  }, [like, dislike]);

  return (
    <>
      <Stack sx={{ justifyContent: "center" }}>
        {!like ? (
          <FaRegThumbsUp onClick={handleLikeClick}></FaRegThumbsUp>
        ) : (
          <FaThumbsUp onClick={handleLikeClick}></FaThumbsUp>
        )}
        <div>{like_value}</div>
        {!dislike ? (
          <FaRegThumbsDown onClick={handleDislikeClick}></FaRegThumbsDown>
        ) : (
          <FaThumbsDown onClick={handleDislikeClick}></FaThumbsDown>
        )}
      </Stack>
    </>
  );
}

export default Like;
