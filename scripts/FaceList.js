

$(document).ready(function () {


  var facelist = getFaceList()
  if (facelist.length == 0) {

    var s = `<div class="alert alert-danger col-lg" role="alert">
      Face Stroage is empty! 
  </div>`

    $(".face-list").append(s)
    return
  }

  for (V of facelist) {



    var s = `<div class="col-mx-6" style="margin-bottom:30px">
<div class="card">`

      + '<h5 class="card-header">' + V.title + '<div class=" float-right badge ' + (V.success ? ' badge-success' : ' badge-danger') + '">' + (V.success ? "SAME" : "DIFF") + '</div> </h5>' +

      `<div class="card-body">
    <div class="row">

    <img class="col-md-6" src="`+ V.image + `"  style="height: 50%; min-width:400px; margin: auto; padding-bottom:30px;">
      <div class="col-lg-6">
        <div class="card border-secondary col-mb" style="margin-bottom: 20px;">
          <div class="card-header">Com</div>
          <div class="card-body text-secondary">
              <div class="col">
                  <div class="row prog-item">
                    <label for="formControlRange" class="col-sm-4" style="font-size: 14px;"> Joy </label>
                    <div class="col-lg">
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width:`+ V.emotions.ai.joy + `%" aria-valuenow="25"
                          aria-valuemin="0" aria-valuemax="100">`+ V.emotions.ai.joy + `%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            <div class="col">
                <div class="row prog-item">
                  <label for="formControlRange" class="col-sm-4" style="font-size: 14px;"> Anger </label>
                  <div class="col-lg">
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style="width: `+ V.emotions.ai.anger + `%" aria-valuenow="25"
                        aria-valuemin="0" aria-valuemax="100">`+ V.emotions.ai.anger + `%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div class="col">
                <div class="row prog-item">
                  <label for="formControlRange" class="col-sm-4" style="font-size: 13px;"> Surprise </label>
                  <div class="col-lg">
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style="width: `+ V.emotions.ai.surprise + `%" aria-valuenow="25"
                        aria-valuemin="0" aria-valuemax="100">`+ V.emotions.ai.surprise + `%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div class="col">
              <div class="row prog-item">
                <label for="formControlRange" class="col-sm-4" style="font-size: 14px;"> Sad </label>
                <div class="col-lg">
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: `+ V.emotions.ai.sad + `%" aria-valuenow="25"
                      aria-valuemin="0" aria-valuemax="100">` + V.emotions.ai.sad + `%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card border-secondary col-mb-6">
            <div class="card-header">Hum</div>
            <div class="card-body text-secondary">
                <div class="col">
                    <div class="row prog-item">
                      <label for="formControlRange" class="col-sm-4" style="font-size: 14px;"> Joy </label>
                      <div class="col-lg">
                        <div class="progress">
                          <div class="progress-bar" role="progressbar" style="width: `+ V.emotions.hum.joy + `%" aria-valuenow="25"
                            aria-valuemin="0" aria-valuemax="100">`+ V.emotions.hum.joy + `%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              <div class="col">
                  <div class="row prog-item">
                    <label for="formControlRange" class="col-sm-4" style="font-size: 14px;"> Anger </label>
                    <div class="col-lg">
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: `+ V.emotions.hum.anger + `%" aria-valuenow="25"
                          aria-valuemin="0" aria-valuemax="100">`+ V.emotions.hum.anger + `%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <div class="col">
                  <div class="row prog-item">
                    <label for="formControlRange" class="col-sm-4" style="font-size: 13px;"> Surprise </label>
                    <div class="col-lg">
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: `+ V.emotions.hum.surprise + `%" aria-valuenow="25"
                          aria-valuemin="0" aria-valuemax="100">`+ V.emotions.hum.surprise + `%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <div class="col">
                <div class="row prog-item">
                  <label for="formControlRange" class="col-sm-4" style="font-size: 14px;"> Sad </label>
                  <div class="col-lg">
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style="width: `+ V.emotions.hum.sad + `%" aria-valuenow="25"
                        aria-valuemin="0" aria-valuemax="100">`+ V.emotions.hum.sad + `%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <br>
    <button id="delete_button" type="button" style="font-size: 30px; color: black;" class="btn btn-link fa fa-trash" aria-hidden="true" card_id="`+ V.id + `"></button>

  </div>
</div>
</div>`

    $(".face-list").append(s)
  }
})


$(document).on('click', '#delete_button',function () {
  if (!confirm("are you sure?"))
    return

  removeFaceList($(this).attr("card_id"))

  location.reload()

})