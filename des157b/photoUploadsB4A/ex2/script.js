
//App ID and JS Key from B4A
Parse.initialize("v9zArfv6XBkBXOdUGAOHQEcqItNgj00VcjjujdaC","sy4kpBKF6uBuUWQr1C4SKjE4yxunHon8k7n5gSxx");
// Parse server
Parse.serverURL = 'https://parseapi.back4app.com/';

document.querySelector('#upload').addEventListener('submit', function(event){
    event.preventDefault();

    const fileUploadControl = document.querySelector('#fileupload');
    //uncomment out the console log line below to see what's in files.
    //console.log(fileUploadControl.files[0]);
    if (fileUploadControl.files.length > 0) {
        const file = fileUploadControl.files[0];
        const name = fileUploadControl.files[0].name;

        //what type of file is it?
        const type = fileUploadControl.files[0].type;

        //how big is the file?
        const size = fileUploadControl.files[0].size;
        if(size < 100000 && type == 'image/jpeg' || type == 'image/png' || type == 'image/webp'){
          uploadPhoto(name, file);
        } else {
          alert('the file is too big or is not a .jpg, .png or .webp file');
        }
    }
});

async function uploadPhoto(name, file){
    // tells us which parse "object" we are working with (database table)
    const newPhoto = new Parse.Object('uploads');
    // sets the file name field to the name variable, which is passed in from line 15
    newPhoto.set('filename', name);
    // sets the file to a file. Parse.File is a special thing that expects binary data (files)
    newPhoto.set('file', new Parse.File(name, file));
    try {
      //Saves the file to the database and returns info about the file into result
      const result = await newPhoto.save();
      console.log(result.attributes.file._url);
      //Access the URL of the photo on B4A
      showUploadedPhoto(result.attributes.file._url);
    } catch (error) {
      console.error('Error while uploading the photo: ', error);
    }
}

function showUploadedPhoto(photoURL){
  let html = '<p>You just uploaded this photo:</p>';
  html += `<img src="${photoURL}">`;
  document.querySelector('#uploaded-img').innerHTML = html;
}

