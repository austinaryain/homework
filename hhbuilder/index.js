// your code goes here ...
window.onload = function() {
    // JSON
    var householdData = [];
    // Constants
    var node = document.createTextNode("Error:");
    var AGE_ERROR = " Age must be greater than 0!";
    var REL_ERROR = " Relationship must be selected!";
    // DOM Additions
    var debug = document.getElementsByClassName('debug')[0];
    var validationError = this.document.createElement('p');
    validationError.style.color = "red";
    // Elements to work with
    var container = this.document.getElementsByClassName('builder')[0];
    var houseHoldList = document.getElementsByClassName('household')[0];    
    var form = this.document.forms[0];
    var relationship = this.document.forms[0]["rel"];
    var ageInput = this.document.forms[0]["age"];
    var smoker = this.document.forms[0]["smoker"];
    var addButton = this.document.getElementsByClassName('add')[0];
    var submitButton = this.document.querySelectorAll("button[type=submit]")[0];

    // Handle Submitting the form
    submitButton.addEventListener('click', function(e){
        e.preventDefault();
        // If the form has valid input go ahead and add the household member
        
        addButton.click();
        // Dont send blank data
        if(householdData.length > 0){
            submitForm();
        } else {
            debug.innerHTML = "";
        }
    });

    // Handle adding new household members
    addButton.addEventListener("click", function(e){
        e.preventDefault();
        if(formIsValid(ageInput, relationship)){
            var member = {
                "age": ageInput.value,
                "relationship": relationship.options[relationship.selectedIndex].value,
                "smoker": (smoker.checked) ? "Smoker" : "Non-Smoker"
            }
            householdData.push(member);
            displayHouseholdMember(member);
            clearForm();
        } else {
            validationError.appendChild(node);
            container.appendChild(validationError);
            addButton.disabled = true;
            submitButton.disabled = true;
        }
    });

    // Clear validation errors when the user tries again
    ageInput.addEventListener('input', function(e) {
        e.preventDefault();
            cleanUp();
    });
    relationship.addEventListener('input', function(e){
        e.preventDefault();
            cleanUp();
    });

    function cleanUp(){
        if(container.contains(validationError)){
            node.nodeValue = "Error:";
            if(ageIsValid(ageInput) && relationshipIsValid(relationship)){
                container.removeChild(validationError);
                addButton.disabled = false;
                submitButton.disabled = false;
            }
        }
    }
    function clearForm(){
        ageInput.value = "";
        relationship.selectedIndex = 0;
        smoker.checked = false;
    }

    function formIsValid (ageInput, relationship) {
        var ageValid = ageIsValid(ageInput);
        var relValid = relationshipIsValid(relationship);
        return (ageValid && relValid);
    }
    function ageIsValid(ageInput){
        if(!ageInput.value || ageInput.value < 1 || isNaN(ageInput.value)){
            if(!node.textContent.includes(AGE_ERROR))node.textContent += AGE_ERROR;
            return false;
        }
        return true;
    }
    function relationshipIsValid(relationship){
        if(relationship.options[relationship.selectedIndex].value == ""){
            if(!node.textContent.includes(REL_ERROR))node.textContent += REL_ERROR;
            return false;
        }
        return true;
    }
    // Send the data to the server.. or to the debug pre.
    function submitForm(){
        debug.innerHTML = JSON.stringify(householdData);
    }
    
    // Create a new li element and put the household member in it
    function displayHouseholdMember(member){
        var node = document.createTextNode(member.relationship + " " + member.age + " " + member.smoker);
        var li = document.createElement('li');
        var remove = document.createElement('button');
        remove.innerText = "Remove";
        remove.addEventListener('click', function(e){
            e.preventDefault();
            householdData.pop(member);
            houseHoldList.removeChild(li);
        });
        li.appendChild(node);
        li.appendChild(remove);
        houseHoldList.appendChild(li);
    }
}

