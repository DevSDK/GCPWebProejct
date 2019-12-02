$(document).ready(function () {

  var objectlist = getObjectList()

  if (objectlist.length == 0) {

    var s = `<div class="alert alert-danger col-lg" role="alert">
      Object Stroage is empty! 
  </div>`

    $(".object-list").append(s)
    return
  }

  for (V of objectlist) {
    var s = `<div class="col-lg-6" style="margin-bottom:30px">
  <div class="card">
           <h5 class="card-header">`+ V.title + '<div class=" float-right badge ' + (V.success ? ' badge-success' : ' badge-danger') + '">' + (V.success ? "SAME" : "DIFF") + `</div> </h5>
          <div class="card-body">
            <div class="row">
 
            <img class="" src="`+ V.image + `"style="width:400px; padding-bottom:30px; margin: auto;">
            <div class="col">
            <div class="row">
            <div class="card border-secondary" style=" margin-bottom: 20px;">
            <div class="card-header">Com</div>
            <div class="card-body text-secondary">
                <P style="height:50px" class="overflow-auto">`+ V.objects.ai + `</P>
            </div>
            </div>  
          
            <div class="card border-secondary col-12" style=" margin-bottom: 20px;">
            <div class="card-header">Hum</div>
            <div class="card-body text-secondary">
                <P style="height:50px" class="overflow-auto">`+ V.objects.hum + `</P>
            </div>
            </div>  
          </div>
            
            
            </div>
            
            </div>
            <button id="delete_button" type="button" style="font-size: 30px; color: black;" class="btn btn-link fa fa-trash" aria-hidden="true" card_id="`+ V.id +`"></button>

          </div>
      </div>`

    $(".object-list").append(s)
  }
})


$(document).on('click', '#delete_button',function () {
  if (!confirm("are you sure?"))
    return

  removeObjectList($(this).attr("card_id"))

  location.reload()

})