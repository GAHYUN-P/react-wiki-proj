import { Box } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Comment(props) {
  return (
    <>
      <div style={{ direction: "row", display: "flex", marginBottom: "5px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            direction="row"
            justifyContent="center"
            alignItems="center"
            container
            spacing={1}
          >
            <Grid item>
              <Item>{props.comment_writer}</Item>
            </Grid>
            <Grid item>
              <Item>{props.comment_desc}</Item>
            </Grid>
            <Grid item>
              <Item>{props.createdAt}</Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}

export default Comment;
