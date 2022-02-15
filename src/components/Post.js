import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import moment from 'moment';

const Post = (props) => {
    console.log(props)

    const bull = (
        <Box
            component="span"
            sx={{
                display: 'inline-block',
                mx: '2px',
                transform: 'scale(0.8)',
            }}>
            •
        </Box>
    );

    return (
        <Card sx={{
                width: 275,
                margin: 2,
            }}>
            <CardContent>
                <Typography
                    sx={{
                        fontSize: 14
                    }}
                    color="text.secondary"
                    gutterBottom>
                    {props.modifiedAt}
                </Typography>
                <Typography variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography
                    sx={{
                        mb: 1.5
                    }}
                    color="text.secondary">
                    {props.writer}
                </Typography>
                <Typography variant="body2">
                    {props.desc}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">자세히 보기</Button>
            </CardActions>
        </Card>
    );
};

export default Post;