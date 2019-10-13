

var mainApp ={};
(function(){
  var db = firebase.database().ref('tasks/');
  var d = new Date()
  var t = d.getTime()
  var counter = t
  const listUI = document.getElementById("list");
  const description = document.getElementById("description");

  //C
  function fnCreate() {
    counter+=1
    // console.log(description.value)
    var task ={
      id:counter,
      description:description.value,
      actived:false
    }
    let db = firebase.database().ref("tasks/" + counter);
    db.set(task)
  }
  //R
  function fnRead(){
    // console.log('132')
    db.once('value',snapshot=>{
      // snapshot.val().forEach(element => {
      //   console.log(element)
      // })
      var data = snapshot.val();
      snapshot.forEach(function (item) {
        // console.log(item.val())
        createHtml(item)
       })
      
    })
  }
  //U
  function fnUpdate(id , task){
    
    let db = firebase.database().ref("tasks/" + id);
    db.update(task)
  }
  function createHtml(data){
    let $li = document.createElement("li");
    $li.innerHTML = data.val().description;
    $li.setAttribute("child-key", data.key);
    if(data.val().actived){
      $li.classList.add("active");
    }
    listUI.append($li)
    $li.addEventListener('click' , function(){
      console.log(data.key)
      userClicked(data.key)
    })
  }

  function userClicked(id) {
    // <div class="board">
    //     <div>description<input id='description' type="text"></div>
    //     <button id='btn' onclick="mainApp.Create()">提交</button>
    // </div>
    let $board = document.createElement("div");
    $board.classList.add('board')

    let $descDiv = document.createElement("div");
    let $descInput = document.createElement("input");
    $descInput.setAttribute('type' , 'text')
    $descInput.setAttribute('id' , 'description')
    let $descBtn = document.createElement("button");
    $descBtn.innerHTML = '送出';
    $descBtn.setAttribute('id' , 'btn')

    let $removeBtn = document.createElement("button");
    $removeBtn.innerHTML = '取消';
    $removeBtn.setAttribute('id' , 'btn')

    $board.append($descDiv)
    $descDiv.append($descInput)
    $descDiv.append($descBtn)
    $descDiv.append($removeBtn)
    listUI.append($board)

    
    $descBtn.addEventListener('click' , function(){
      var task ={
        description:$descInput.value,
        actived:true
      }
      fnUpdate(id , task)
      console.log(task)
    })

    $removeBtn.addEventListener('click',function(){
      $board.remove()
    })

  }

  

  mainApp.Create = fnCreate;
  mainApp.Read = fnRead;
  mainApp.Update = fnUpdate;
})()

mainApp.Read();
// const SupportHK ={
//   init:function(){
//     var that = this
//     $('#app').append('<img src="https://i2.wp.com/www.en24.news/wp-content/uploads/2019/10/ba796f8c41657396e869a010034958a8.jpg?fit=1200%2C676&ssl=1" alt="">')
//   },
//   createblock:function(){
//     var container = $('<div></div>').addClass('container')
//     $('#app').append(container)
//     for (let i = 0; i < 263; i++) {

      
//       container.append(`<div class="block" title="特別制定了新戰機條例去借款欠債。但勇鷹呢？不必制定條例，又不可能從年度預算中編列，表示不必花錢！">${i}</div>`)
//     }
//   }
// }