/*
Andre Little
Class: Visual Frame Works
Term: 1309
Instructor: Mr. Gibson
Completed Date: 9/26/2013
Project 4: Mega Weight Lost Project - JS Source
*/

// The beginning of the Dom.
window.addEventListener("DOMContentLoaded", function(){
	
	/* ------ Shortcuts ------ */
	// This will get the Element by Id.
	var getId = function (x){
		var elId = document.getElementById(x);
		return elId;
	};
	
	var getTag = function (x){
		var elTag = document.getElementsByTagName(x);
		return elTag;
	};
	
	var createEl = function (x){
		var makeEl = document.createElement(x);
		return makeEl;
	}
	/* ------ End of the Shortcuts ------ */
	
	// Find Value of Picked Radio.
	function getSelectedRadio (){
		var radio = document.forms[0].add
		for (var i=0; i<radio.length; i++){
			if (radio[i].checked){
				addValue = radio[i].value
			}
		}
	};
	
	 // Hide Form Data.
	function hideForm(f){
		switch(f){
			case "on":
				getId("docForm").style.display = "none";
				getId("clearInfo").style.display = "inline";
				getId("displayInfo").style.display = "none";
				getId("addNewMeal").style.display = "inline";
				break;
			case "off":
				getId("docForm").style.display = "block";
				getId("clearInfo").style.display = "inline";
				getId("displayInfo").style.display = "inline";
				getId("addNewMeal").style.display = "none";
				getId("storedItems").style.display = "none";
				break;
			default:
				return false;
		
		}
	};
	
	
	
	// Save Data Function
	function dataSaved(key){
		if (!key){
			var randomNum = Math.floor(Math.random()*1000000001);
		} else {
			randomNum = key;
		}
		// Get all Form data.
		getSelectedRadio ();
		var item = {};
			item.dates = ["Date:", getId("date").value];
			item.times = ["Meal Time:", getId("mealTime").value];
			item.itemname = ["Name:", getId("name1").value];
			item.fatgrams = ["Grams of Fat:", getId("fat").value];
			item.carbgrams = ["Gram of Carbs:", getId("carbs").value];
			item.programs = ["Grams of Protein:", getId("pro").value];
			item.size = ["Serving Size:", getId("servings").value];
			item.additional = ["Add item:", addValue];
			item.notes = ["Notes about Meal:", getId("addInfo").value];
			// Save Data to local Storage.
			localStorage.setItem(randomNum, JSON.stringify(item));
			alert("Meal has been Saved!");
			window.location.reload();	
	};
	
	// Display Data Funtion
	function gotData() {
		if (localStorage.length === 0){
			alert("There is no User Data saved at this time, so default data has been added.");
			defaultData();
		} else {
			hideForm("on");
			var newDiv = createEl("Div");
			newDiv.setAttribute("id", "storedItems");
			document.body.appendChild(newDiv);
			var newFieldSet = createEl("fieldset");
			newFieldSet.setAttribute("id", "infoFieldSet");
			newDiv.appendChild(newFieldSet);
			var newList = createEl("ul");
			newFieldSet.appendChild(newList);
			getId("storedItems").style.display = "block"; 
			for (var i=0, d=localStorage.length; i<d; i++){
				var newLi = createEl("li");
				var linksLi = createEl("li"); // This is new
				newList.appendChild(newLi);
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var obj = JSON.parse(value);
				var newSubList = createEl("ul");
				newLi.appendChild(newSubList);
				getImage(obj.times[1], newSubList);
				for (var e in obj){
					var newSubLi = createEl("li");
					newSubList.appendChild(newSubLi);
					var optSubText = obj[e][0]+" "+obj[e][1];
					newSubLi.innerHTML = optSubText;
					newSubList.appendChild(linksLi); // This is New
				}
				editDeleteLinks(localStorage.key(i), linksLi); // This is new.
			}
		}
	};
	
	//Add Meal Time Images
	function getImage(pngName, newSubList){
		var imageLi = createEl("li");
		newSubList.appendChild(imageLi);
		var newImage = createEl("img");
		var setSrc = newImage.setAttribute("src", "images/"+ pngName + ".png");
		imageLi.appendChild(newImage);
		
	}
	
	
	//Default Data Load Function
	function defaultData(){
		for(var m in json){
			var randomNum = Math.floor(Math.random()*1000000001);
			localStorage.setItem(randomNum, JSON.stringify(json[m]));
		}
	}
	

	//Edit and Delete Links Function // This is new 
		// Edit Function
	function editDeleteLinks(key, linksLi){
		var editLink = createEl("a");
		editLink.href = "#";
		editLink.key = key;
		var textForEdit = "Edit Meal";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = textForEdit;
		linksLi.appendChild(editLink);
		
		// Line Break
		var breakEl = createEl("br");
		linksLi.appendChild(breakEl);
		
		//Delete Function
		var deleteLink = createEl("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var textForDelete = "Delete Meal";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = textForDelete;
		linksLi.appendChild(deleteLink);	
	};
	
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		hideForm("off");

		// Populating the Form field
		getId("date").value = item.dates[1];
		getId("mealTime").value = item.times[1];
		getId("name1").value = item.itemname[1];
		getId("fat").value = item.fatgrams[1];
		getId("carbs").value = item.carbgrams[1];
		getId("pro").value = item.programs[1];
		getId("servings").value = item.size[1];
		var radio = document.forms[0].add
		for (var i=0; i<radio.length; i++){
			if (radio[i].value == "Yes" && item.additional == "Yes"){
				radio[i].setAttribute("checked", "checked");
			} else
			if (radio[i].value == "No" && item.additional == "No"){
				radio[i].setAttribute("checked", "checked");
			}
		}		
	
		// Remove Initial listener from the submit button..
		saveData.removeEventListener("click", dataSaved);
		getId("submitInfo").value = "Edit Meal";
		var editMeal = getId("submitInfo");
		editMeal.addEventListener("click", validate);
		editMeal.key = this.key;
		
		
	};
	
	//Delete Item
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this Meal?");
		if (ask){
			localStorage.removeItem(this.key);
			window.location.reload();
		} else {
			alert("Meal was not deleted.")
		}
	}

	//Clear Data Function
	function dataCleared(){
		if (localStorage.length === 0){
			alert("There is no data to be cleared.")
		} else {
			alert("All saved data has been erased.")
			localStorage.clear();
			window.location.reload();
			return false;
		}
	};
	
	function validate(e){
		var getDates = getId("date");
		var getTimes = getId("mealTime");
		var getItemname = getId("name1");
		var getFat = getId("fat");
		var getCarbs = getId("carbs");
		var getPro = getId("pro");
		var getSize = getId("servings");
		
		errMsg.innerHTML = "";
		getDates.style.border = "1px solid black";
		getTimes.style.border = "1px solid black";
		getItemname.style.border = "1px solid black";
		getFat.style.border = "1px solid black";
		getCarbs.style.border = "1px solid black";
		getPro.style.border = "1px solid black";
		getSize.style.border = "1px solid black";
		getSize.style.border = "1px solid black";
		
		//Error Message
		var messageAry = [];
		if (getDates.value == ""){
			var dateError = "Please Select a Date";
			getDates.style.border = "1px solid red";
			messageAry.push(dateError);
		}
		if (getTimes.value == "--Make a Choice--"){
			var timeError = "Please Select a Meal Time";
			getTimes.style.border = "1px solid red";
			messageAry.push(timeError);
		}
		if (getItemname.value == ""){
			var itemError = "Please Enter the Name of your Food Item";
			getItemname.style.border = "1px solid red";
			messageAry.push(itemError);
		}
		if (getFat.value == ""){
			var fatError = "Please Enter the amount of Total Fat Grams.";
			getFat.style.border = "1px solid red";
			messageAry.push(fatError);
		}
		if (getCarbs.value == ""){
			var carbsError = "Please Enter the amount of Carbohydrates.";
			getCarbs.style.border = "1px solid red";
			messageAry.push(carbsError);
		}
		if (getPro.value == ""){
			var proError = "Please Enter the amount of Protein.";
			getPro.style.border = "1px solid red";
			messageAry.push(proError);
		}
		if (getSize.value == ""){
			var sizeError = "Please Enter the amount of Servings Per Item";
			getSize.style.border = "1px solid red";
			messageAry.push(sizeError);
		}
		// If any Errors..
		if (messageAry.length >= 1){
			for (var i=0, j=messageAry.length; i<j; i++){
				var text = createEl("li");
				text.innerHTML = messageAry[i];
				errMsg.appendChild(text);
			}
			e.preventDefault();
			return false;
		} else {
			dataSaved(this.key);
		}
		
	}
	
	// Default Variables
	var mealTimes = ["--Make a Choice--", "Breakfast", "Lunch", "Dinner"],
		addValue,
		errMsg = getId("errors");
	//Links and Click Submit Events.
	var displayData = getId("displayInfo");
	displayData.addEventListener("click", gotData);
	var clearData =	getId("clearInfo");
	clearData.addEventListener("click", dataCleared);
	var saveData = getId("submitInfo");
	saveData.addEventListener("click", validate);	
});