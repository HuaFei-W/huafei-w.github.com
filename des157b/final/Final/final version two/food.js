Parse.initialize("ogfPqYG2MQvgizlicdfIFd5pdfFcdqUsNBc9QlwN", "YmnCdl4vifij1okNIMu9KhdY2IlyGM2DJq0rMULH");
Parse.serverURL = "https://parseapi.back4app.com/";

// const friendlist = document.querySelector("section");
const mainpage = document.querySelector('#mainpage');
const submitpage = document.querySelector('#submitpage');
const firstform = document.querySelector('#firstform');
const secondform = document.querySelector('#secondform');
const thankyou = document.querySelector('#thankyou');
// const inputs = document.querySelectorAll("#add-food-form input:not([type=submit])");

const submit = document.querySelector('#submit');
const next = document.querySelector('#next');
const send = document.querySelector('#send');
const explore = document.querySelector('#explore');
const addfood = document.querySelector('#addfood');
const backtopage = document.querySelector('#backtopage');
const backtofirstform = document.querySelector('#backtofirstform');

let imgSrc = ""
let results=[]
// Back4App

addfood.addEventListener('click', function() {
	submitpage.className = 'showing';
	mainpage.className = 'hidden';
	firstform.className = 'showing';
	secondform.className = 'hidden';
});

backtopage.addEventListener('click', function(){
	submitpage.className = 'hidden';
	mainpage.className = 'showing';
});

backtofirstform.addEventListener('click', function(){
	firstform.className = 'showing';
	secondform.className = 'hidden';
});

// submit.addEventListener('click', function(){
//     thankyou.className = 'hidden';
//     submitpage.className = 'showing';
//     firstform.className = 'showing';
//     secondform.className = 'hidden';
// });


next.addEventListener('click', function(event) {
	event.preventDefault();
	firstform.className = 'hidden';
	secondform.className = 'showing';

});


send.addEventListener('click', async function() {
	console.log('send')
	await addFood();
	submitpage.className = 'hidden';
	thankyou.className = 'showing';

});

explore.addEventListener('click', function() {
	thankyou.className = 'hidden';
	mainpage.className = 'showing';
});

// addFoodForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//   addFood();
// });

upload_file.addEventListener('change', function() {
	var file = upload_file.files[0];
	console.log(file)
	r = new FileReader();
	r.onload = function() {
		// console.log(r.result)
		imgSrc = file;
		showImage.src = r.result;
		showImage.className = 'showing';
	}
	r.readAsDataURL(file);
})

//database
async function displayFood() {
	const foods = Parse.Object.extend("food");
	const query = new Parse.Query(foods);

	try {
		const results = await query.ascending("location").find();

		results.forEach(function(eachFood) {
			const id = eachFood.id;
			const location = eachFood.get("location");
			const file = eachFood.get("file").url();
			console.log(file);
			const description = eachFood.get("description");
			const title = eachFood.get("title");
			//let file=""
			let r = new FileReader();
			const thedivItem = document.createElement("div");
			thedivItem.innerHTML = `<div class="name"></div>
			<div id = "scroll">
					<img src=${file}>
					<div>
						<p></i>${title}</p>
						<p><i class="bi bi-geo-alt"></i>${location}</p>
						<p><i class="bi bi-chat-right-dots"></i>${description}</p>
					</div>
			</div>`;

			friendlist.append(thedivItem);
		});
	} catch (error) {
		console.error("Something Error", error);
	}
}

displayFood()

async function addFood() {
	const newFood = {};
	// for (let i = 0; i < inputs.length; i++) {
	// 	let key = inputs[i].getAttribute("name");
	// 	let value = inputs[i].value;
	// 	console.log(key,value)
	// 	newFood[key] = value;
	// }
	newFood.location = document.getElementById("location").value;
	newFood.description = document.getElementById("description").value;
	newFood.title = document.getElementById("title").value;
	newFood.upload_file = document.getElementById("upload_file").files[0];
	newFood.upload_file_name = document.getElementById("upload_file").files[0].name;
	newFood.file = imgSrc;
	newFood.description = description.value;
	
	if (
		newFood.location != "" &&
		newFood.title != ""&&
		newFood.description != ""
	) {
		const newFoodData = new Parse.Object("food");
		newFoodData.set("location", newFood.location);
		newFoodData.set("file", new Parse.File(newFood.upload_file_name, newFood.upload_file));
		newFoodData.set("description", newFood.description);
		newFoodData.set("title", newFood.title);

		try {
			await newFoodData.save();
			resetFormFields();
			submitpage.className = "submitpage";
			friendlist.innerHTML = "";
			displayFood();
		} catch (error) {
			console.error("Something Error", error);
		}
	}
}

function resetFormFields() {
	document.getElementById("location").value = "";
	document.getElementById("title").value = "";
	document.getElementById("description").value = "";
	imgSrc = "";
	showImage.src = "";
	showImage.className = 'hidden';
}

