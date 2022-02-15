import { useState } from "react";
import axios from "axios";
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from "react-redux";

import Category from "../shared/Category";
import Post from "../components/Post";

const Main = (props) => {

    const dispatch = useDispatch();
    const [post_list, setPost_List] = useState([])

    React.useEffect(async () => {
        // dispatch(setProduct());
        await axios
            .get("http://3.36.62.222/post/1", {}, {withCredentials: true})
            .then((response) => {
                console.log(response)
                console.log(response.data)
                // setPost_List(dataFormat)
            });
    }, []);

    // console.log(post_list)

    return (
        <React.Fragment>
            <div
                style={{
                    padding: "50px",
                    margin: "50px 0px"
                }}>
                <Grid container spacing={5}>
                    <Grid item xs="auto">
                        <Category/>
                    </Grid>
                    <Grid item xs={10} display="flex" flexWrap="wrap">
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                    </Grid>
                    {/* <Grid item="item" xs="xs">
                    <Item>xs</Item>
                </Grid> */
                    }
                </Grid>
            </div>
        </React.Fragment>
    );
};

export default Main;
