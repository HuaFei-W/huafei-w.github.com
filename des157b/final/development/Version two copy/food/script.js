Parse.initialize("ogfPqYG2MQvgizlicdfIFd5pdfFcdqUsNBc9QlwN","YmnCdl4vifij1okNIMu9KhdY2IlyGM2DJq0rMULH"); 
Parse.serverURL = "https://parseapi.back4app.com/";


  
const submit = document.querySelector('#submit');
const next = document.querySelector('#next');
const send = document.querySelector('#send');
const explore = document.querySelector('#explore');
const addfood = document.querySelector('#addfood');

const foodlist = document.querySelector("container");
const mainpage = document.querySelector('#mainpage');
const submitpage = document.querySelector('#submitpage');
const firstform = document.querySelector('#firstform');
const secondform = document.querySelector('#secondform');
const thankyou = document.querySelector('#thankyou');
const inputs = document.querySelectorAll("#add-food input:not([type=submit])");
// Back4App

let note = {
    'location': null,
    'description': null,
};

addfood.addEventListener('click', function(){
    submitpage.className = 'showing';
    mainpage.className = 'hidden';
    main.className = 'showing';
});

submit.addEventListener('click', function(){
    thankyou.className = 'hidden';
    submitpage.className = 'showing';
    firstform.className = 'showing';
    secondform.className = 'hidden';
});

explore.addEventListener('click', function(){
  thankyou.className = 'hidden';
  mainpage.className = 'showing';
});

next.addEventListener('click', function(event){
    event.preventDefault();
    firstform.className = 'hidden';
    secondform.className = 'showing';

});


send.addEventListener('click', function(){
    submitpage.className = 'hidden';
    thankyou.className = 'showing';
  
});

//database
async function addculture(){
  const newResponse = {};
  
  for(let i=0; i<inputs.length; i++){
    let key = inputs[i].getAttribute('name');
    let value = inputs[i].value;
    newResponse[key] = value;
  }
  if (
    newResponse.location != "" &&
    newResponse.description != "" 
  ){
    const newResponseData = new Parse.Object("food");
    newResponseData.set("location", newResponse.location);
    newResponseData.set("description", newResponse.description);

    try {
      await newResponseData.save();
      resetFormFields();
      submitpage.className = "showing";
      foodlist.innerHTML = "";
      displayFood();
    } catch(error) {
      console.error('Error while creating response: ', error);
    
    }
  }
}

async function displayFood() {
  const responses = Parse.Object.extend('food');
  const query = new Parse.Query(responses);

  try {
    const results = await query.ascending("location").find();

    results.forEach(function(eachResponse) {
      const id = eachResponse.id;
      const location = eachFriend.get("location");
      const description = eachFriend.get("description");

      const thesecItem = document.createElement("section");
      thesecItem.innerHTML = `<div class="name">${location} ${description}</div>
      <i class="" id="d-${id}"></i>`;
      foodlist.append(thesecItem);
   });
 } catch (error) {
   console.error("Error while fetching foods", error);
 }
}
  
function resetFormFields() {
  document.getElementById("location").value = "";
  document.getElementById("description").value = "";
}


