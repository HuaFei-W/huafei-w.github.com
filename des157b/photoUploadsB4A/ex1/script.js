
//App ID and JS Key from B4A
Parse.initialize("v9zArfv6XBkBXOdUGAOHQEcqItNgj00VcjjujdaC","sy4kpBKF6uBuUWQr1C4SKjE4yxunHon8k7n5gSxx");
// Parse server
Parse.serverURL = 'https://parseapi.back4app.com/';

document.querySelector('#upload').addEventListener('submit', function(event){
    event.preventDefault();

    const fileUploadControl = document.querySelector('#fileupload');
    //uncomment out the console log line below to see what's in files.
    // console.log(fileUploadControl.files[0]);
    if (fileUploadControl.files.length > 0) {
        const file = fileUploadControl.files[0];
        const name = fileUploadControl.files[0].name;
        uploadPhoto(name, file);
    }
});

async function uploadPhoto(name, file){
    const newPhoto = new Parse.Object('uploads');
    newPhoto.set('filename', name);
    newPhoto.set('file', new Parse.File(name, file));
    try {
      const result = await newPhoto.save();
      // console.log(result);
      // console.log(result.attributes);
      console.log(result.attributes.file);
      console.log(result.attributes.file._url);
    } catch (error) {
      console.error('Error while uploading the photo: ', error);
    }
}

