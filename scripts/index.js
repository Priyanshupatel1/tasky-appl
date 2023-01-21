const state={
     taskList: [],
};
//dom manipulation
const taskModel=document.querySelector(".task__modal__body");
const taskContent=document.querySelector(".task__content")

//to create a cardr in homepage
const htmlTaskContent=({id,title,description,type,url})=>`
<div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
     <div class='card shadow-sm task__card'>
          <div class='card-header d-flex justify-content-end task__card__header'>
               <button type='button' class='btn btn-outline-info mr-2' name=${id}>
               <i class='fa fa-pencil-alt' name='${id}'></i>
               </button>
               <div class='card-body'>
                    ${
                         url &&
                         `<img width=100%' src=${url} alt='card image here' class='card-image-top md-3 rounded-lg'/>`
                    }
                    <h4 class ='task__card__title'>${title}</h4>
                    <p class='description trim-3-lines text-muted'data-gram_editor='false'>${description}</p>
                    <div class='tags text-white d-flex flex-wrap'>
                         <span class='badge bg-primary m-1'>${type}</span>
                    </div>
               </div>
                    <div class='card-footer'>
                         <button type='button' class='btn btn-outline-primary float-right data-bs-toggle="modal" data-bs-target="#showTask">open task</button>
                    </div>
           </div>
     </div>
</div>
`;//dynaimic modals (cards) on our home pg/url
const htmlModalContent=({id,title,description,type,url})=>{
     const date=new Date(parseInt(id));
     return `
     <div id = ${id}> ${
          url &&
               `<img width=100%' src=${url} alt='card image here' class='img-fluid place__holder__image mb-3'/>`
          }<strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
          <h2 class="my-3">${title}</h2>
          <p class='lead'>${description}</p>
          <span class='badge bg-primary m-1'>${type}</span>
     </div>`;
};
//here we will be updating our local storage(i.e., the modals/cards which we see on our ui)
const updateLocalStorage=()=>{
     localStorage.setItem("task",//setitem when we need to add/store anything on local browser.
     JSON.stringify({  //here we are converting string into group of objects=> stringify is group of objects images text 
          tasks: state.taskList,
     })
     );
};///

//to get data or card or modals on ur ui from local storage(browsers)
const loadInitialData= () => {
     const localStorageCopy= JSON.parse(localStorage.task);//reverse
     if(localStorageCopy)state.taskList= localStorageCopy.task;
     state.taskList.map((cardData)=>{
               taskContent.insertAdjacentHTML("beforeend",htmlTaskContent(cardData));//tag learn on mdn docs
     });
};

const handleSubmit=(event)=>{
     const id=`${Date.now()}`;
     const input={
          url: document.getElementById("imageUrl").value,//we can acees values
          title:document.getElementById("taskTitle").value,
          type:document.getElementById("taskType").value,
          description:document.getElementById("taskDescription").value,
     };
     if(input.title===""|| input.type ===""||input.description===""){
          return alert("Please Fill all the fields")
     }
taskContent.insertAdjacentHTML("beforeend",htmlTaskContent({
...input,
id,
})
);
state.taskList.push({...input,id})
updateLocalStorage();
};

// const updateLocalStorage=()=>{
//      lacalStorageCopy=JSON.parse(localStorage.task);
//      if(localStorageCopy) DataTransfer.taskList = localStorageCopy.task;

//      state.task.map((cardData)=>{
//           taskContent.insertAdjacentHTML("beforeend")
//      })
// }