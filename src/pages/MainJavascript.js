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

const MainJavascript = (props) => {
    // console.log(props)

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

    console.log(post_list)

    const new_post_list = post_list.filter(p => p.category === 'JavaScript');
    console.log(new_post_list);
    
    // setPost_List(post_list.filter(p => p.category === 'Computer Science'));
    // console.log(post_list);
    
    

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
                          <Category/>
                      </Grid>
                      <Grid display="flex" flexWrap="wrap" item xs={13}>
                          {
                              new_post_list.map((p, idx) => {
                                
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

export default MainJavascript;