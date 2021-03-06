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
                                            ???????????? ?????? ??????
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
                                            - ??? ????????? ????????? ???????????? ?????????
                                            <text
                                                style={{
                                                    color: '#E65923',
                                                    border: '2px solid',
                                                    margin: '1px 2px 0px 5px',
                                                    padding: '3px',
                                                    fontSize: '12px'
                                                }}>??? ?????? ??????</text>??? ??????????????????<br/>
                                            - ????????? ????????? ?????????????????? ???????????????.<br/>
                                            - ?????????????????????
                                            <text
                                                style={{
                                                    color: '#E65923',
                                                    border: '2px solid',
                                                    margin: '1px 2px 0px 5px',
                                                    padding: '3px',
                                                    fontSize: '12px'
                                                }}>?????????</text>??? ????????? ????????? ???????????? 
                                            <text
                                                style={{
                                                    color: '#666666',
                                                    border: '2px solid',
                                                    margin: '1px 2px 0px 5px',
                                                    padding: '3px',
                                                    fontSize: '12px'
                                                }}>?????????</text>??? ????????? ????????? ???????????????<br/>
                                            - <text
                                                style={{
                                                    color: 'blue'
                                                }}>?????? 50???</text> ????????? ???????????? ???????????? ???????????????!<br/>
                                            - ????????????????????? ????????? ??????????????? <text
                                                style={{
                                                    color: '#E65923'
                                                }}> contributor</text>??? ???????????? ????????????<br/>
                                            - ????????????????????? ????????? ?????? ??? ???????????? :)
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
                                ??? ?????? ??????</Button>
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
                            ?????????</Button>
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
