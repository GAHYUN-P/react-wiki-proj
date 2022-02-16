import { useState } from "react";
import axios from "axios";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { useDispatch, useSelector } from "react-redux";
import { actionsCreators as cgActions } from "../redux/modules/category";

import Category from "../shared/Category";
import Post from "../components/Post";

const Main = (props) => {
  console.log(props);

  const dispatch = useDispatch();
  const [post_list, setPost_List] = useState([]);

  React.useEffect(async () => {
    // dispatch(setProduct());
    await axios
      .get("http://3.36.62.222/", {}, { withCredentials: true })
      .then((response) => {
        setPost_List(response.data);
      });
  }, []);

  console.log(post_list);

  const indexinfo = useSelector((state) => state.category.category);
  console.log(indexinfo);

  if (indexinfo !== "all") {
    setPost_List(post_list.filter((p) => p.category === indexinfo));
    console.log(post_list);
  }

  if (indexinfo === "all") {
    return (
      <React.Fragment>
        <Grid
          style={{
            margin: "50px 0px",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Grid container="container" spacing={2} columns={16}>
              <Grid item="item" xs={3}>
                <Category props={post_list} />
              </Grid>
              <Grid display="flex" flexWrap="wrap" item xs={13}>
                {post_list.map((p, idx) => {
                  return <Post {...p} key={p.post_id}></Post>;
                })}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid
        style={{
          margin: "50px 0px",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Grid container="container" spacing={2} columns={16}>
            <Grid item="item" xs={3}>
              <Category props={post_list} />
            </Grid>
            <Grid display="flex" flexWrap="wrap" item xs={13}>
              {post_list.map((p, idx) => {
                return <Post {...p} key={p.post_id}></Post>;
              })}
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default Main;
