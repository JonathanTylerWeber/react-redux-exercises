import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addMeme, deleteMeme, selectMemes
} from './memeSlice';
import memeIds from './memeIds';

const apiUsername = import.meta.env.VITE_API_USERNAME;
const apiPassword = import.meta.env.VITE_API_PASSWORD;


export default function MemeGenerator() {
  const memes = useSelector(selectMemes);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    upper: '',
    lower: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const templateId = memeIds[Math.floor(Math.random() * memeIds.length)];
    console.log(templateId)

    try {
      const res = await fetch(`https://api.imgflip.com/caption_image?username=${apiUsername}&password=${apiPassword}&text0=${formData.upper}&text1=${formData.lower}&template_id=${templateId}`);
      const data = await res.json();

      if (data.success) {
        dispatch(addMeme({ url: data.data.url }));
      } else {
        console.error('Error creating meme:', data.error_message);
      }

    } catch (error) {
      console.error('Network error:', error);
    }
    setFormData({ upper: '', lower: '' });
  }

  const handleDelete = (id) => {
    dispatch(deleteMeme(id))
  }

  return (
    <div>

      <h1>Create a meme!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='upper'>Upper Text:</label>
        <input
          type='upper'
          required
          name='upper'
          id='upper'
          value={formData.upper}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor='lower'>Lower Text:</label>
        <input
          type='lower'
          required
          name='lower'
          id='lower'
          value={formData.lower}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type='submit' >
          Submit
        </button>
      </form>

      <div>
        <h2>Memes:</h2>
        <div>
          {memes.map((meme) => (
            <div key={meme.id}>
              <img src={meme.url} />
              <button onClick={() => handleDelete(meme.id)}>x</button>
              <br />
              <br />
            </ div>
          ))}
        </div>
      </div>


    </div>
  );
}
