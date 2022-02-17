import * as React from "react";
import {Grid, Image, Button} from "../elements";
import wikiwiki_logo from "./wikiwiki_logo.png";
import styled from "styled-components";
import {history} from "../redux/configureStore";
import Box from '@mui/material/Box';
import Buttons from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Header = (props) => {

    const {page} = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (page === "main") {
        return (
            <React.Fragment>
                <Grid z_index="1" position="fixed" BG_c="#F2F2F2" height="70px" width="100%">
                    <Grid is_between="is_between" padding="0px 15px 0px 0px">
                        <Grid>
                            <Image
                                shape="imagePost"
                                src={wikiwiki_logo}
                                _onClick={() => {
                                    window.location.href = '/'
                                }}/>
                        </Grid>

                        <Grid is_flex="is_flex">
                            <div>
                            <Button
                                _onClick={handleOpen}
                                BG_color="white"
                                font_weight="bold"
                                font_size="15x"
                                font_color="#E65923"
                                height="45px"
                                Border="2px solid #E65923"
                                B_radius="5px"
                                margin="5px"
                                width="40px">
                                ?</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description">
                                    <Box
                                        sx={style}
                                        style={{
                                            width: '65%',
                                            border: '3px solid #E65923',
                                            borderRadius: '10px'
                                        }}>
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                            style={{
                                                fontWeight: 'bold'
                                            }}>
                                            위키위키 사용 방법
                                        </Typography>
                                        <hr/>
                                        <Typography
                                            id="modal-modal-description"
                                            sx={{
                                                mt: 2
                                            }}
                                            style={{
                                                lineHeight: '28px'
                                            }}>
                                            - 새 포스트 작성을 원하시면 상단의
                                            <text
                                                style={{
                                                    color: '#E65923'
                                                }}> 새 주제 발행</text>을 클릭해주세요<br/>
                                            - 카드를 누르면 상세페이지로 이동합니다.<br/>
                                            - 상세페이지에서
                                            <text
                                                style={{
                                                    color: '#E65923'
                                                }}>좋아요</text>를 누르면 온도가 올라가고 
                                            <text
                                                style={{
                                                    color: '#E65923'
                                                }}> 싫어요</text>를 누르면 온도가 내려갑니다<br/>
                                            - 상세페이지에서 내용을 수정하시면 contributor로 닉네임이 남아요!<br/>
                                            - 상세페이지에서 댓글도 남길 수 있습니다 :)
                                        </Typography>
                                    </Box>
                                </Modal>
                            </div>
                            <Button
                                _onClick={() => {
                                    window.location.href = '/write'
                                }}
                                BG_color="white"
                                font_weight="bold"
                                font_size="15x"
                                font_color="#E65923"
                                height="45px"
                                Border="2px solid #E65923"
                                B_radius="5px">
                                새 주제 발행</Button>
                        </Grid>
                    </Grid>
                </Grid>

            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Grid z_index="1" position="fixed" BG_c="#F2F2F2" height="70px" width="100%">
                <Grid is_between="is_between" padding="0px 15px 0px 0px">
                    <Grid>
                        <Image
                            shape="imagePost"
                            src={wikiwiki_logo}
                            _onClick={() => {
                                window.location.href = '/'
                            }}/>
                    </Grid>

                    <Grid>
                        <Button
                            _onClick={() => {
                                window.location.href = '/'
                            }}
                            BG_color="white"
                            font_weight="bold"
                            font_size="15x"
                            font_color="#E65923"
                            height="45px"
                            Border="2px solid #E65923"
                            B_radius="5px">
                            홈으로</Button>
                    </Grid>
                </Grid>
            </Grid>

        </React.Fragment>
    );

};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default Header;
