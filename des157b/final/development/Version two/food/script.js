Parse.initialize("ogfPqYG2MQvgizlicdfIFd5pdfFcdqUsNBc9QlwN","YmnCdl4vifij1okNIMu9KhdY2IlyGM2DJq0rMULH"); 
Parse.serverURL = "https://parseapi.back4app.com/";

(function () {
    "use strict";

    const mainpage = document.querySelector('#mainpage');
    const submitpage = document.querySelector('#submitpage');
    const firstform = document.querySelector('#firstform');
    const secondform = document.querySelector('#secondform');
    const thankyou = document.querySelector('#thankyou');
  
    const newBtn = document.getElementById("newbtn");
    const addFriendForm = document.getElementById("add-friend");
    const next = document.querySelector('#next');
    const send = document.querySelector('#send');
    const explore = document.querySelector('#explore');
    const friendlist = document.querySelector("section");
    const inputs = document.querySelectorAll(
      "#add-friend input:not([type=submit])"
    );
    let thisRecord;

    newBtn.addEventListener("click", function (event) {
      event.preventDefault();
      addFriendForm.className = "add-friend-onscreen";
    });
  
    addFriendForm.addEventListener("submit", function (event) {
      event.preventDefault();
      addFriend();
    });
  



    async function displayFood() {
      const friends = Parse.Object.extend("food");
      const query = new Parse.Query(friends);
  
      try {
        const results = await query.ascending("location").find();
  
        results.forEach(function (eachFriend) {
          const id = eachFriend.id;
          const location = eachFriend.get("location");
          const description = eachFriend.get("description");
  
          const thelistItem = document.createElement("div");
          thelistItem.innerHTML = `<div class="name">${location} ${description}</div>
          
           <i class="" id="d-${id}"></i>`;
  
          friendlist.append(thelistItem);
        });
      } catch (error) {
        console.error("Error while fetching friends", error);
      }
    }
  
    displayFood();
  
  
    async function addFriend() {
      const newFriend = {};
  
      for (let i = 0; i < inputs.length; i++) {
        let key = inputs[i].getAttribute("name");
        let value = inputs[i].value;
        newFriend[key] = value;
      }
      if (
        newFriend.location != "" &&
        newFriend.description != "" 
      ) {
        const newFriendData = new Parse.Object("food");
        newFriendData.set("location", newFriend.location);
        newFriendData.set("description", newFriend.description);

        try {
          await newFriendData.save();
          resetFormFields();
          addFriendForm.className = "add-friend-offscreen";
          friendlist.innerHTML = "";
          displayFood();
        } catch (error) {
          console.error("Error while creating friend", error);
        }
      // } else {
        // addFriendForm.className = "add-friend-offscreen";
      }
    }

    function resetFormFields() {
      document.getElementById("location").value = "";
      document.getElementById("description").value = "";
    }
  })();

  //add
  