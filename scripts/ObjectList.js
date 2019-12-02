$(document).ready(function () {

    for (V of getObjectList()) {

        var s = `<div class="col-sm-6" style="margin-bottom:30px">
        <div class="card">
          <h5 class="card-header">`+ V.title + '<div class=" float-right badge ' + (V.success ? ' badge-success' : ' badge-danger') + '">' + (V.success ? "SAME" : "DIFF") + `</div> </h5>
          <div class="card-body">
            <div class="row">
      
              <img class="col-md-6" src="`+ V.image + `" style="height: 50%; margin: auto;">
              <div class="col">
                <div class="card border-secondary col-mb-6" style="max-width: 18rem; margin-bottom: 20px;">
                  <div class="card-header">Com</div>
                  <div class="card-body text-secondary">
                      <P style="height:50px" class="overflow-auto">`+ V.objects.ai + `</P>
                  </div>
                </div>
      
                <div class="card border-secondary col-mb-6" style="max-width: 18rem;">
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
        </div>
      </div>`

        $(".object-list").append(s)
    }
})