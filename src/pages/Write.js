import React, {useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '../config'
import { actionsCreators as postActions } from '../redux/modules/post'
import moment from 'moment';


import { Grid, Text, Input, Button } from "../elements";

const Write = (props) => {
  ////

  const dispatch = useDispatch()
  const [postInfo, setPostInfo] = useState([])
    
    //eidt
  // const id = props.match.params.id
  // const is_edit = id ? true : false
  // useEffect(() =>{

  //     axiosInstance.get(`/product`, )
  //     .then((res) =>{
  //         setPostInfo(res.data)
  //     })
  //     .catch((err)=> console.log(err))
  // },[])

  const [title, setTitle] = useState(postInfo ? postInfo.title : ""); 
  const [desc,setDesc] = useState(postInfo ? postInfo.content : "");
  const [password,setPassword] = useState();
  const [writer,setWriter] = useState();
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const addpost =() =>{
      if( !title || !desc || !password || !writer || !category){
          window.alert("빈 공간을 채워주세요!")
          return ;
      }
      dispatch(postActions.add_Post({
        title: title,
        writer: writer,
        category: category,
        password: password,
        desc: desc,
      }))
  }

  return (
    <Grid>
      <Grid padding="16px" margin="10px auto" is_flex="is_flex">
        <Text bold="bold" size="36px">
          게시글 작성
        </Text>
      </Grid>
      <Grid width="50%" padding="16px" margin="10px auto">
        <Input 
        placeholder="제목을 입력해주세요."
        _onChange={(e) => setTitle(e.target.value)}
        value={title} />
        <Grid width="80%" padding="10px">
          <Box
            sx={{
              minWidth: 120,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value={"의류"}>의류</MenuItem>
                <MenuItem value={"전자기기"}>전자기기</MenuItem>
                <MenuItem value={"장난감"}>장난감</MenuItem>
                <MenuItem value={"가구"}>가구</MenuItem>
                <MenuItem value={"취미생활"}>취미생활</MenuItem>
                <MenuItem value={"기타"}>기타</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Grid padding="10px" is_flex="is_flex" is_column="is_column">
            <Input 
            is_area="is_area" 
            placeholder="비밀번호" 
            _onChange={(e) => setPassword(e.target.value)}
            value={password}/>
          </Grid>
          <Grid padding="10px" is_flex="is_flex" is_column="is_column">
            <Input 
            is_area="is_area" 
            placeholder="글쓴이" 
            _onChange={(e) => setWriter(e.target.value)}
            value={writer}/>
          </Grid>
          <Grid padding="10px" is_flex="is_flex" is_column="is_column">
            <Input 
            is_area="is_area" 
            placeholder="내용을 입력해주세요."
            _onChange={(e) => setDesc(e.target.value)}
            value={desc} />
            <Grid width="auto" padding="10px">
              <Button width="80px" bg="#fff" _onClick={addpost}>등록하기</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Write.defaultProps = {
  src: "",
};

export default Write;
