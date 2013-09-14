/*
Andre Little
Class: Visual Frame Works
Term: 1309
Instructor: Mr. Gibson
Completed Date: 9/13/2013
Project 2: Mega Weight Lost Project - JS Source
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
	
	// Save Data Function
	function dataSaved(){
		var randomNum = Math.floor(Math.random()*1000000001);
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
			alert("There is no data saved at this time.");
		} else {
			hideForm("on");
			var newDiv = createEl("newDiv");
			newDiv.setAttribute("id", "storedItems");
			var newList = createEl("ul");
			newDiv.appendChild(newList);
			document.body.appendChild(newDiv);
			getId("storedItems").style.display = "display"; 
			for (var i=0, d=localStorage.length; i<d; i++){
				var newLi = createEl("li");
				newList.appendChild(newLi);
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var obj = JSON.parse(value);
				var newSubList = createEl("ul");
				newLi.appendChild(newSubList);
				for (var e in obj){
					var newSubLi = createEl("li");
					newSubList.appendChild(newSubLi);
					var optSubText = obj[e][0]+" "+obj[e][1];
					newSubLi.innerHTML = optSubText;
				}
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
	
	//Clear Data Function
	function dataCleared(){
		if (localStorage.length === 0){
			alert("There is no data to be cleared.")
		} else {
			localStorage.clear();
			alert("All saved data has been erased.")
			window.location.reload();
			return false;
		}
	};
	
	// Default Variables
	var mealTimes = ["--Make a Choice--", "Breakfast", "Lunch", "Dinner"],
		addValue;
	
	
	//Links and Click Submit Events.
	var displayData = getId("displayInfo");
	displayData.addEventListener("click", gotData);
	var clearData =	getId("clearInfo");
	clearData.addEventListener("click", dataCleared); 
	var saveData = getId("submitInfo"); 
	saveData.addEventListener("click", dataSaved);
	

});