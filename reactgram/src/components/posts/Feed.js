import React, {useState, useEffect} from 'react';
import { FeedStyles } from '../styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import manopla from '../../imgTemp/manopla.jpg'
import userImg from '../../imgTemp/userImg.jpg'
import SendIcon from '@material-ui/icons/Send';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import api from '../../services/api';
import io from 'socket.io-client';

export default function Feed() {
  const classes = FeedStyles();
  const [feed, setFeed] = useState([]);
  
  useEffect( () => {
    CheckPosts();
    registerToSocket();
  }, [])

  async function CheckPosts(){
    const response = await api.get('posts');
    console.log(response.data)
    setFeed(response.data)
  }

  function registerToSocket(){
      const socket = io('http://localhost:8000');
      socket.on('posts', newPost => {
          setFeed([newPost, ...feed])
      })

  }

  return (
    <div>
        {/* <Card className={classes.card}>
            <CardHeader
                avatar={
                <Avatar alt="leomozzer" src={userImg} aria-label="imgUser" className={classes.avatar}/>
                }
                title="leomozzer"
                subheader="São José, Santa Catarina"
            />
            <CardMedia
                className={classes.media}
                image={manopla}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Recriando a interface do Instagram usando React
                </Typography>
                <Typography variant="body2" className={classes.hashtags} component="span">
                    #React #Manopla
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="comment">
                    <ChatBubbleOutlineIcon />
                </IconButton>
                <IconButton aria-label="send" className={classes.send}>
                    <SendIcon/>
                </IconButton>
            </CardActions>
        </Card> */}
        {feed.map(posts => (
            <Card key={posts._id} className={classes.card}>
                <CardHeader avatar={<Avatar alt=''/>} title={posts.author} subheader={posts.place}/>
                <CardMedia className={classes.media} image={`http://localhost:8000/files/${posts.image}`} />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{posts.description}</Typography>
                    <Typography variant="body2" component="span" className={classes.hashtags}>{posts.hashtags}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="comment">
                    <ChatBubbleOutlineIcon />
                </IconButton>
                <IconButton aria-label="send" className={classes.send}>
                    <SendIcon/>
                </IconButton>
                </CardActions>
            </Card>
        ))}
    </div>
  );
}