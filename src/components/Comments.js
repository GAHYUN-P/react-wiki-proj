import React from "react";

function Comment(props) {
  console.log(props);
  console.log(props);
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>{props.comment_writer}</div>
        <div>{props.comment_desc}</div>
        <div>{props.createdAt}</div>
      </div>
    </>
  );
}

export default Comment;
