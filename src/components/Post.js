import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import styled from "styled-components";

import { Grid, Text } from "../elements";
import {
  FaThermometerHalf,
  ThermometerSun,
  FaTwotoneFire,
} from "react-icons/fa";
import { BsThermometerSnow, BsThermometerSun } from "react-icons/bs";
// BsThermometerSnow, BsThermometerSun, AiTwotoneFire, BsSnow2} from 'react-icons/fa';

import moment from "moment";
import { useHistory } from "react-router-dom";

const Post = (props) => {
  const new_desc = props.desc.substring(0, 50) + " ...";
  const new_title = props.title.substring(0, 10) + " ...";

  const bull = (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        mx: "2px",
        transform: "scale(0.8)",
      }}
    >
      •
    </Box>
  );

  return (
    <Grid
      _onClick={() => {
        window.location.href = `/detail/${props.post_id}`;
      }}
    >
      <Card
        sx={{
          width: 250,
          margin: 2,
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: 10,
            }}
            color="text.secondary"
            gutterBottom="true"
          >
            마지막 업데이트
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
            }}
            color="text.secondary"
            gutterBottom="true"
          >
            {props.modifiedAt}
          </Typography>
          <Typography variant="h5" component="div">
            {new_title}
          </Typography>
          <Typography
            sx={{
              mb: 1.5,
            }}
            color="text.secondary"
          >
            {props.writer}
          </Typography>
          <Grid margin="0px 0px 10px 0px">
            <Typography variant="body2">{new_desc}</Typography>
          </Grid>
          <Hr />
          <Grid is_between="is_between" margin="10px 0px 0px 0px">
            {props.likes === 0 && (
              <Grid is_flex>
                <FaThermometerHalf size="15px" />
                <Text margin="0px 3px" F_size="12px">
                  {props.likes}
                </Text>
                <Text F_size="11.5px">℃</Text>
              </Grid>
            )}
            {props.likes < 0 && (
              <Grid is_flex>
                <BsThermometerSnow color="blue" size="15px" />
                <Text margin="0px 3px" F_size="12px">
                  {props.likes}
                </Text>
                <Text F_size="11.5px">℃</Text>
              </Grid>
            )}

            {props.likes > 0 && (
              <Grid is_flex>
                <BsThermometerSun color="red" size="15px" />
                <Text margin="0px 3px" F_size="12px">
                  {props.likes}
                </Text>
                <Text F_size="11.5px">℃</Text>
              </Grid>
            )}

            {/* <Text F_size="12px">
                            좋아요{props.likes}
                        </Text> */}

            <Text F_size="12px">댓글 {props.comment_count}개</Text>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

const Hr = styled.hr`
  border: 0;
  border-top: 1px dashed #e65923;
`;

export default Post;
