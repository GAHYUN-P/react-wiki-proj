import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config";
import { actionCreators as postActions } from "../redux/modules/post";
import Paper from "@mui/material/Paper";

import moment from "moment";

import { Grid, Text, Input, Button } from "../elements";

const Write = (props) => {
  ////
  const dispatch = useDispatch();
  const [postInfo, setPostInfo] = useState([]);

  const [title, setTitle] = useState(postInfo ? postInfo.title : "");
  const [desc, setDesc] = useState(postInfo ? postInfo.content : "");
  const [password, setPassword] = useState();
  const [writer, setWriter] = useState();
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const addpost = () => {
    if (!title || !desc || !password || !writer || !category) {
      window.alert("빈 공간을 채워주세요!");
      return;
    }
    dispatch(
      postActions.add_Post({
        title: title,
        writer: writer,
        category: category,
        password: password,
        desc: desc,
      })
    );
  };

  return (
    <Grid width="70%" margin="auto">
      <Grid padding="16px" margin="10px auto" is_flex="is_flex">
        <Text bold="bold" size="36px">
          게시글 작성
        </Text>
      </Grid>
      <Paper elevation={3}>
        <Grid width="100%" padding="16px" margin="10px auto">
          <Grid is_between width="100%">
            <Grid is_flex>
              <Grid margin="5px 0px">
                <Input
                  width="100%"
                  height="52px"
                  B_radius="4px"
                  placeholder="  글쓴이"
                  _onChange={(e) => setWriter(e.target.value)}
                  value={writer}
                />
              </Grid>
              <Grid margin="10px 10px">
                <Input
                  type="password"
                  padding="0px 2px 0px 0px"
                  width="100%"
                  height="52px"
                  B_radius="4px"
                  placeholder="  비밀번호"
                  _onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Grid>
            </Grid>
            <Grid>
              <Box
                sx={{
                  minWidth: 120,
                  width: 200,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    카테고리
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Computer Science"}>
                      Computer Science
                    </MenuItem>
                    <MenuItem value={"JAVA"}>JAVA</MenuItem>
                    <MenuItem value={"JavaScript"}>JavaScript</MenuItem>
                    <MenuItem value={"React"}>React</MenuItem>
                    <MenuItem value={"Spring"}>Spring</MenuItem>
                    <MenuItem value={"기타"}>기타</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Input
            margin="5px 0px 0px 0px"
            height="52px"
            B_radius="4px"
            placeholder="  제목을 입력해주세요."
            _onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Grid width="100%" padding="5px 0px 0px 0px">
            <Input
              is_textarea
              B_radius="4px"
              rows="10"
              height="150px"
              _onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
            <Grid width="auto" padding="10px">
              <Button width="80px" bg="#fff" _onClick={addpost}>
                등록하기
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

Write.defaultProps = {
  src: "",
};

export default Write;
