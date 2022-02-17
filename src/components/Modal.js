import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { axiosInstance } from "../config";
import { useHistory } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = (props) => {
  const id = props.id;
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    axiosInstance
      .delete(
        `/post/${id}`,
        { data: { password: password } },
        { withCredintial: true }
      )
      .then((res) => {
        history.replace("/");
      });
  };

  return (
    <div>
      <Button onClick={handleOpen}>삭제</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            삭제
          </Typography>
          <input type="password" onChange={handleChange} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            삭제하시겠습니까?
          </Typography>
          <Button onClick={handleClick}>삭제</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
