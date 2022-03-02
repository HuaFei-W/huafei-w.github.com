
//App ID and JS Key from B4A
Parse.initialize("v9zArfv6XBkBXOdUGAOHQEcqItNgj00VcjjujdaC","sy4kpBKF6uBuUWQr1C4SKjE4yxunHon8k7n5gSxx");
// Parse server
Parse.serverURL = 'https://parseapi.back4app.com/';

document.querySelector('#upload').addEventListener('submit', function(event){
    event.preventDefault();

    const fileUploadControl = document.querySelector('#fileupload');
    if (fileUploadControl.files.length > 0) {
        const file = fileUploadControl.files[0];
        const name = fileUploadControl.files[0].name;
        const type = fileUploadControl.files[0].type;
        const size = fileUploadControl.files[0].size;
        if(size < 100000 && type == 'image/jpeg' || type == 'image/png' || type == 'image/webp'){
          uploadPhoto(name, file);
        } else {
          alert('the file is too big or is not a .jpg or .png file');
        }
    }
});

async function uploadPhoto(name, file){
    const newPhoto = new Parse.Object('uploads');
    newPhoto.set('filename', name);
    newPhoto.set('file', new Parse.File(name, file));
    try {
      const result = await newPhoto.save();
      // get the ID of the photo saved.
      console.log(result.id);
      // A function that runs a new query to get info about the photo you just added
      getNewPhoto(result.id);
    } catch (error) {
      console.error('Error while uploading the photo: ', error);
    }
}

async function getNewPhoto(photoId){
  // which "object" are we dealing with (database table)
  const records = Parse.Object.extend('uploads');
  // make a new query
  const query = new Parse.Query(records);
  // Find the record you just added
  query.equalTo("objectId", photoId);
  try{
    // results holds the whole record and meta data about the record
    const results = await query.find();
    // The .get() method gets a speficif field. The url() method is special for files
    const photoURL = results[0].get('file').url();
    // get the photo file name from the filename field
    const photoName = results[0].get('filename');
    // pass both values into the showUploadedPhoto function
    showUploadedPhoto(photoURL, photoName);
  } catch (error) {
      console.error('Error while getting photo', error);
  } 
}

// This function now has two parameters
function showUploadedPhoto(photoURL, photoName){
  // single quotes replaced with tick marks to use the photoName
  let html = `<p>You just uploaded ${photoName}:</p>`;
  html += `<img src="${photoURL}" alt="${photoName}">`;
  document.querySelector('#uploaded-img').innerHTML = html;
}