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

function Like(props) {
  console.log(props)
  let id = props.id;
  const post = useSelector((state) => state.post);

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [error, setError] = useState("");

  const handleLikeClick = () => {
    if (dislike) {
      setDislike(false);
    }
    setLike((prev) => !prev);
  };

  const handleDislikeClick = () => {
    if (like) {
      setLike(false);
    }
    setDislike((prev) => !prev);
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
      <div style={{ display: "flex", justifyContent: "left" }}>
        <div>{post.likes}</div>
        {!like ? (
          <FaRegThumbsUp onClick={handleLikeClick}></FaRegThumbsUp>
        ) : (
          <FaThumbsUp onClick={handleLikeClick}></FaThumbsUp>
        )}
        {!dislike ? (
          <FaRegThumbsDown onClick={handleDislikeClick}></FaRegThumbsDown>
        ) : (
          <FaThumbsDown onClick={handleDislikeClick}></FaThumbsDown>
        )}
      </div>
    </>
  );
}

export default Like;
