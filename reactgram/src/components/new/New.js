import React, {useState} from 'react';
import './New.css'
// import { Container } from './styles';
import api from '../../services/api'

export default function New() {
  const [infos, setInfos] = useState({
    image : null,
    author: '',
    place: '',
    description: '',
    hashtags: ''
  })

  async function handleSubmit(e){
    console.log(infos)
    e.preventDefault();
    const data = new FormData();
    data.append('image', infos.image);
    data.append('author', infos.author);
    data.append('place', infos.place);
    data.append('description', infos.description);
    data.append('hashtags', infos.hashtags);
    await api.post('posts', data);
  }

  function handleSendImage(e){
    setInfos({
      image : e.target.files[0]
    })
  }

  function handleChange(e){
    setInfos({...infos,
      [e.target.name] : e.target.value
    })
  }

  return (
    <form id='new-post' onSubmit={handleSubmit} >
        <input type='file' name='image' onChange={handleSendImage}/>
          <input
              type='text'
              name='author'
              placeholder='Autor do post'
              onChange={handleChange}
              value={infos.author}
          />
          <input
              type='text'
              name='place'
              placeholder='Local do post'
              onChange={handleChange}
              value={infos.place}
          />
          <input
              type='text'
              name='description'
              placeholder='Descrição do post'
              onChange={handleChange}
              value={infos.description}
          />
          <input
              type='text'
              name='hashtags'
              placeholder='Hashtags do post'
              onChange={handleChange}
              value={infos.hashtags}
          />
          <button type='submit'>Enviar</button>
    </form>
  );
}
