import * as React from "react";
import {Grid, Image, Button} from "../elements";
import wikiwiki_logo from "./wikiwiki_logo.png";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Header = (props) => {

    return (
        <React.Fragment>
            <Grid z_index= "1" position="fixed" BG_c="#F2F2F2" height="70px" width="100%">
                <Grid is_between padding="0px 15px 0px 0px">
                    <Grid>
                        <Image shape="imagePost" src={wikiwiki_logo}/>
                    </Grid>

                    <Grid>
                        <Button _onClick={()=>{window.location.href = '/write'}} BG_color="white" font_weight="bold" font_size="15x" font_color="#E65923" height="45px" Border="2px solid #E65923" B_radius="5px">
                            새 주제 발행</Button>
                    </Grid>
                </Grid>
            </Grid>

        </React.Fragment>
    );
};

export default Header;
