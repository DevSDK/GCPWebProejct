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
    var s = `<div class="col-mx-6" style="margin-bottom:30px">
  <div class="card">
           <h5 class="card-header">`+ V.title + '<div class=" float-right badge ' + (V.success ? ' badge-success' : ' badge-danger') + '">' + (V.success ? "SAME" : "DIFF") + `</div> </h5>
          <div class="card-body">
            <div class="row">
      
              <img class="col-md-6" src="`+ V.image + `" style="height: 50%; min-width:400px; padding-bottom:30px; margin: auto;">
              <div class="col-lg-6">
                <div class="card border-secondary col-mb" style=" margin-bottom: 20px;">
                  <div class="card-header">Com</div>
                  <div class="card-body text-secondary">
                      <P style="height:50px" class="overflow-auto">`+ V.objects.ai + `</P>
                  </div>
                </div>
      
                <div class="card border-secondary col-mb-6">
                    <div class="card-header">Hum</div>
                    <div class="card-body text-secondary">
                        <p style="height:50px" class="overflow-auto">`+ V.objects.hum + `</p>
                    </div>
                  </div>
              </div>
            </div>
            <br>
            <i style="font-size: 30px;" class="fa fa-trash" aria-hidden="true"></i>
      
          </div>
      </div>`

    $(".object-list").append(s)
  }
})