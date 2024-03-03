let list = document.getElementById("ul_Id");

function getItemfromstorage(){  // get item from localstorage.
    let getitem=localStorage.getItem("listitem");
    let parseitem=JSON.parse(getitem);

    if(parseitem === null){
        return [];
    }
    else{
        return parseitem;
    }
}

let listitem = getItemfromstorage();
let listlength = listitem.length;

function saveitembtn(){
    localStorage.setItem("listitem", JSON.stringify(listitem)); //store item in localstorage.

};

function additembtn(){
    let userInput=document.getElementById("inputId").value;
    if(userInput === ""){
        alert("please enter valid text");
        return;
    }
    listlength = listlength + 1;   
    let newitem ={
        item:userInput,
        uniqueNo:listlength,
        isChecked: false
    };
    listitem.push(newitem);
   ul_list_items(newitem); 
}

function todoStatus(checkboxId,labelId,listId){
    let checkboxElement=document.getElementById(checkboxId);
    let labelElement= document.getElementById(labelId);
    let listid=document.getElementById(listId);
    labelElement.classList.toggle("wordcross");  // If their is only two option,then we can use toggle method other than if else. 
   


    let listObjectIndex=listitem.findIndex(function(listItem){  
        let listItemId= "todo"+ listItem.uniqueNo;
        console.log(listItemId);
        console.log(listId);
        if(listItemId === listid){
            return true;
        }
        else{
            return false;
        }
    });


    let listObject = listitem[listObjectIndex];
    console.log(listObject);

    if(listObject.isChecked === true){
        listObject.isChecked = false;
    }
    else{
        listObject.isChecked = true;
    }
}

function deleteStatus(listId){
    let del_element  = document.getElementById(listId);
    list.removeChild(del_element);

    let delIndex=listitem.findIndex(function(listItem){  // delete item from local storage.
        let listItemId="todo"+listItem.uniqueNo;
        if(listItemId === listId){
            return true;
        }
        else{
            return false;
        }
    });
    
    listitem.splice(delIndex,1);
}


function ul_list_items(todo){
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let listId = "list" + todo.uniqueNo;


    let listelement= document.createElement("li");
    listelement.classList.add("itmcontainer");
    listelement.id=listId;
    list.appendChild(listelement);


    let ckeckboxinput=document.createElement("input");
    ckeckboxinput.type="checkbox";
    ckeckboxinput.id= checkboxId;
    ckeckboxinput.classList.add("checkbox");
    ckeckboxinput.onclick= function(){
        todoStatus(checkboxId,labelId,listId);
    };
    listelement.appendChild(ckeckboxinput);

    let labeldiv= document.createElement("div");
    labeldiv.classList.add("labelsdiv","d-flex","flex-row");
    listelement.appendChild(labeldiv);

    let labelitem=document.createElement("label");
    labelitem.setAttribute("for", checkboxId);
    labelitem.id=labelId;
    labelitem.classList.add("inputlabel");
    labelitem.textContent = todo.item;
    labeldiv.appendChild(labelitem);

    let deleteicondiv  = document.createElement("div");
    deleteicondiv.classList.add("deleteicon");
    labeldiv.appendChild(deleteicondiv);

    let deleteicon=document.createElement("i");
    deleteicon.classList.add("far","fa-trash-alt","icon");
    deleteicon.style.display = "inline-block";
    deleteicon.onclick = function(){
        deleteStatus(listId);
    };
    deleteicondiv.appendChild(deleteicon);
    
}

for (let todo of listitem){
    ul_list_items(todo);
}







