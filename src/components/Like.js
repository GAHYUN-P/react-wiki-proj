import { useState } from "react";
import { useSelector } from "react-redux";

function Like() {
  const post = useSelector((state) => state.post);

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const handleLikeClick = () => {
    setLike((prev) => !prev);
    console.log(like);
  };

  const handleDislikeClick = () => {
    setDislike((prev) => !prev);
    console.log(dislike);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "left" }}>
        <div>{post.likes}</div>
        <div onClick={handleLikeClick}>like</div>
        <div onClick={handleDislikeClick}>disLike</div>
      </div>
    </>
  );
}

export default Like;
