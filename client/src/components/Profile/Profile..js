import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import './Profile.css'
import { inject } from 'mobx-react';
import Button from '@mui/material/Button';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import storage from '../firebase/firebase'
import { v4 } from "uuid"
import axios from 'axios';
function Profile(props) {
    const [imageUpload, setImageUpload] = useState(null)
    let user = Object.assign({},props.AuthStore.user)
    let userID = user._id
    function uploadImage () {
        if ( imageUpload && userID ) {
            console.log(userID)
            const imageRef = ref(storage, `images-profile/${imageUpload.name + v4()}`)
            uploadBytes(imageRef, imageUpload)
            .then(() => {
              getDownloadURL(imageRef)
                .then(url => {
                  const item = {imageURL: url ,userID}
                  console.log(item)
                  axios.post(`http://localhost:4000//uploadImage`, item)
                    .then(data => {
                      console.log(data)
                      alert(`Item saved successfully`)
    
                    })
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        }
    }
    
    return (
        <div>
            <div className='profile-container'>
                <div className='profile-image'>
                    <Stack direction="row" spacing={2}  >
                        <Avatar className= {`profile-image-avatar`}
                            alt="Remy Sharp"
                            src="https://img.favpng.com/12/15/21/computer-icons-avatar-user-profile-recommender-system-png-favpng-HaMDUPFH1etkLCdiFjgTKHzAs.jpg"
                            sx={{ width: 200, height: 200 }}
                        >
                         <label htmlFor="custom-file-input"></label>
                         <input type="file" className="custom-file-input"
                         onChange={(event) => { setImageUpload(event.target.files[0]) }}  />
                         </Avatar>
                    </Stack>
                </div>
                <div className='btn-update-profile'> 
                <Button variant="contained" color="success" onClick={ uploadImage}>
                  Update
                </Button>
                </div>
                {/* <div className='first-last-name-profile'>{user.firstName} {user.lastName}</div> */}
                <div className='first-last-name-profile'>{`Khale`} {`Wani`}</div>
                <div className='black-line'></div>
                <div className='email-profile'>{`Email : khaled11@gmail.com`}</div>
            </div>
        </div>
    )
}

export default inject(`AuthStore`)(Profile)