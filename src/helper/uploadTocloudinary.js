const cloudinary = require('cloudinary').v2;
const keys = require('../../config/env/keys')
cloudinary.config({
    cloud_name: keys.cloudinaryName,
  api_key: keys.cloudinaryKey,
  api_secret: keys.cloudinarySecret
})
const eager_options = {width: 1000, height: 1500, crop: 'scale', format: 'jpg'}
const uploader = async (file) =>{
    const res = cloudinary.uploader.upload(file, {eager: eager_options})
    .then(function(image) {
        return image.url
    })
    .catch(function(err){
        throw new Error(err)
    })
    return res
}

module.exports = uploader;