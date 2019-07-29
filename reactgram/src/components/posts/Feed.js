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
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import SendIcon from '@material-ui/icons/Send';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import TextField from '@material-ui/core/TextField';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import api from '../../services/api';
import io from 'socket.io-client';
import { Button } from '@material-ui/core';

export default function Feed() {
  const classes = FeedStyles();
  const [feed, setFeed] = useState([]);
  let [newComment, setComment] = useState({
      userId : '',
      btn : true,
      comment : '',
  })
  
  useEffect( () => {
    registerToSocket();
    CheckPosts();
    // eslint-disable-next-line
  },[])
  async function CheckPosts(id){
    if(id === 1){
        const response = await api.get('posts');
        return response.data;
    }
    else{
        const response = await api.get('posts');
        setFeed(response.data)
    }
  }

  function registerToSocket(){
      const socket = io('http://localhost:8000');
      socket.on('posts', newPost => {
          setFeed([newPost, ...feed])
      })
      socket.on('like', likePost => {
        CheckPosts(1).then(res => {
            if(res._id === likePost.id){
                res._id = likePost.id;
                setFeed(res)
            }
        })
      })
      socket.on('delete', posts => {
          setFeed(posts)
      })
      socket.on('comment', posts => {
          CheckPosts();
      })
  }
  function handleLike(id){
      api.post(`/posts/${id}/like`)
  }
  function deletePost(id){
    api.post(`/posts/${id}/delete`)
  }
  function handleComment(e){
    e.preventDefault();
    const userNumber = new Date();
    setComment({btn : false, comment : e.target.value, userId : `User${userNumber.getSeconds()}`})
  }
  function addComment(id){
        api.post(`/posts/${id}/comment?text=${newComment.comment}&author=${newComment.userId}`)
        setComment({btn : true, comment : '', userId: ''})
  }

  return (
    <div>
        {feed.map(posts => (
            <Card key={posts._id} className={classes.card}>
                <CardHeader 
                    avatar={<Avatar src={`http://localhost:8000/users/${posts.author}.jpg`} alt=''/>} 
                    title={posts.author} 
                    subheader={posts.place}
                    action={
                        <IconButton aria-label="Delete" onClick={() => deletePost(posts._id)}>
                          <DeleteOutline />
                        </IconButton>}
                />
                <CardMedia className={classes.media} image={`http://localhost:8000/files/${posts.image}`} />
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={() => handleLike(posts._id)}>
                        {posts.likes !== 0 ? <FavoriteIcon/> : <FavoriteBorderOutlined/>  }
                    </IconButton>
                        {posts.likes !== 0 ? posts.likes : null  }
                    <IconButton aria-label="comment">
                        <ChatBubbleOutlineIcon />
                    </IconButton>
                    <IconButton aria-label="send" className={classes.send}>
                        <SendIcon/>
                    </IconButton>
                </CardActions>
                <CardContent>
                    <Typography variant="body2" color="textPrimary" component="p">{posts.description}</Typography>
                    <Typography variant="body2" component="span" className={classes.hashtags}>{posts.hashtags}</Typography>
                    {posts.comments.length !== 0 && <table>
                            {posts.comments.map(data => (
                                <tbody key={data.author}>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" component="span">
                                                <span style={{fontWeight : "bold"}}>{data.author}</span><span>: {data.text}</span>
                                            </Typography>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                    </table>
                    }
                    <div className={classes.commentSesion}>
                        <TextField
                            id="standard-with-placeholder"
                            // label="With placeholder"
                            placeholder="Add a comment..."
                            className={classes.comment}
                            margin="normal"
                            onChange={handleComment}
                            value={newComment.comment}
                        />
                        <Button className={classes.btnComment} onClick={() => addComment(posts._id)} disabled={newComment.btn} color="primary">Publish</Button>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
  );
}