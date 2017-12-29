 function getIndex(){
  var numberWork=$('.count');
  var todoLength=$('#todo a');
  var doingLength=$('#doing a');
  var doneLength=$('#done a');
  numberWork[0].innerHTML = $('#todo .collection-item').length;
  numberWork[1].innerHTML = $('#doing .collection-item').length;
  numberWork[2].innerHTML = $('#done .collection-item').length;
 }
 var COLUMN_TYPE=['todo','doing','done'];
 var DB ={
 	getData:function(){
 		if (typeof(Storage) !== "undefined") {
 			var data;
 			try{
 				data=JSON.parse(localStorage.getItem('list'))|| {};

 			}
 			catch (error) {
 				data={};
 						}

 			return data;
 
          } 		
          else {
    				alert('sorry!no web storage support..');
    				return {};
				}


 	},
 	setData:function(data){
 		localStorage.setItem('list',JSON.stringify(data))
  }

 };
 var list=DB.getData();
 var app={
 newJob: function(e,type,input){
 	var jobName=$(input).val();
 	var event=window.event||e;
 	if(event.keyCode === 13&& jobName.trim()!==''){
    if(!list[type]) {list[type]=[]}
      list[type].push(jobName);
    DB.setData(list);

 

 		//update DOM
 		this.addJobToList(type,jobName);	
 		//Reset input
 	    $(input).val('');
      getIndex()


 	}

 },
 addJobToList:function(type,jobName){
 	var item='<a href="#!" class="collection-item">'+jobName+ 
 	'<span class="badge" onclick="app.deleteJob(this)"><i class="small material-icons">delete</i></span></a>';

 	$('#'+ type).append(item)
 },
 deleteJob:function(span){
 	var modal=$('#modal-confirm').modal();
  var btn=$('#btn-delete');
 	var item=$(span).parent();
 	modal.modal('open');
  $('#btn-delete').off('click');
 	$('#btn-delete').on('click',function(){
    var columnType=item.parent().attr('id');
    var itemPosition=$('#'+ columnType+'.collection-item').index(item);
    list[columnType].splice(itemPosition, 1);
    DB.setData(list);
	   item.remove();
     getIndex()
	   modal.modal('close');
 	});
 },



 };
 $(function(){
  COLUMN_TYPE.forEach(function(type){
    var columnType=list[type]|| [];
    columnType.forEach(function(jobName){
      app.addJobToList(type,jobName);
      getIndex()
    })

  })
  $( ".sorted-list" ).sortable({
     connectWith: '.sorted-list',
    placeholder: 'ui-state-highlight',
    start:function(event,ui){
      $(ui.item[0]).addClass('dragging');
      ui.item.oldColumnType=ui.item[0].parentElement.getAttribute('id');
      ui.item.oldItemPosition=ui.item.index();
      getIndex()
    },
    stop:function(event,ui){
      $(ui.item[0]).removeClass('dragging');
       var item = ui.item;
      var oldColumnType = item.oldColumnType;
      var oldItemPosition = item.oldItemPosition;
      var newColumnType = item[0].parentElement.getAttribute('id');
      var newItemPosition = item.index();
      //remove item from old position
      list[oldColumnType].splice(oldItemPosition,1);
      //add item to new position
      list[newColumnType].splice(newItemPosition,0,item[0].innerText);
      DB.setData(list);
    }
  })
});
 
