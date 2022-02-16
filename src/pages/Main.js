import {useState} from "react";
import axios from "axios";
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import {useDispatch, useSelector} from "react-redux";

import Category from "../shared/Category";
import Post from "../components/Post";

const Main = (props) => {

    const dispatch = useDispatch();
    const [post_list, setPost_List] = useState([])

    React.useEffect(async () => {
        // dispatch(setProduct());
        await axios
            .get("http://3.36.62.222/", {}, {withCredentials: true})
            .then((response) => {
                console.log(response)
                console.log(response.data)
                setPost_List(response.data)
            });
    }, []);

    // console.log(post_list)

    const indexinfo = useSelector((state) => state.category.list[0])
    console.log(indexinfo);  

    return (
        <React.Fragment>
            <Grid style={{
                    margin: "50px 0px",
                    padding: "20px"
                }}>
              <Box sx={{
                      flexGrow: 1
                  }}>
                  <Grid container="container" spacing={2} columns={16}>
                      <Grid item="item" xs={3}>
                          <Category props={post_list}/>
                      </Grid>
                      <Grid display="flex" flexWrap="wrap" item xs={13}>
                          {
                              post_list.map((p, idx) => {
                                  console.log({
                                      ...p
                                  } + '맵찍기')
                                  return (<Post {...p} key={p.post_id}></Post>)
                              })
                          }
                      </Grid>
                  </Grid>
              </Box>
            </Grid>
        </React.Fragment>
    );
};

export default Main;
