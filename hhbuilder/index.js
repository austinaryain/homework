// your code goes here ...
var household = [];
var node = document.createTextNode("Error:");
var houseHoldList = document.createElement('ul');
var debug = document.getElementsByClassName('debug')[0];

window.onload = function() {
    var validationError = this.document.createElement('p');
    validationError.style.color = "red";

    var container = this.document.getElementsByClassName('builder')[0];
    var form = this.document.forms[0];
    var addButton = this.document.getElementsByClassName('add')[0];
    var submitButton = this.document.querySelectorAll("button[type=submit]")[0];
    var relationship = this.document.forms[0]["rel"];
    var ageInput = this.document.forms[0]["age"];
    var smoker = this.document.forms[0]["smoker"];
    document.body.appendChild(houseHoldList);

    submitButton.addEventListener('click', function(e){
        e.preventDefault();
        submitForm();
    });

    addButton.addEventListener("click", function(e){
        e.preventDefault();
        var formValid = validateForm(ageInput, relationship);
        if(formValid){
            var member = {
                "age": ageInput.value,
                "relationship": relationship.options[relationship.selectedIndex].value,
                "smoker": (smoker.checked) ? "Smoker" : "Non-Smoker"
            }
            household.push(member);
            displayHouseholdMember(member);
            ageInput.value = "";
            relationship.selectedIndex = 0;
            smoker.checked = false;
        } else {
            validationError.appendChild(node);
            container.appendChild(validationError);
            addButton.disabled = true;
            submitButton.disabled = true;
        }
    });

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
            addButton.disabled = false;
            submitButton.disabled = false;
            node.nodeValue = "Error:";
            container.removeChild(validationError);
        }
    }
}

function validateForm (ageInput, relationship) {
    var ageValid = true;
    var relValid = true;
    if(!ageInput.value || ageInput.value < 1){
        ageValid = false;
        node.nodeValue += " Age must be greater than 0!"
    }
    if(relationship.options[relationship.selectedIndex].value == ""){
        relValid = false;
        node.nodeValue += " Relationship must be selected!"                
    }
    return (ageValid && relValid);
}

function submitForm(){
    debug.innerHTML = JSON.stringify(household);
}

function displayHouseholdMember(member){
    var node = document.createTextNode(member.relationship + " " + member.age + " " + member.smoker + " ");
    var li = document.createElement('li');
    var remove = document.createElement('button');
    remove.innerText = "Remove";
    remove.addEventListener('click', function(e){
        e.preventDefault();
        household.pop(member);
        houseHoldList.removeChild(li);
    });
    li.appendChild(node);
    li.appendChild(remove);
    houseHoldList.appendChild(li);
}