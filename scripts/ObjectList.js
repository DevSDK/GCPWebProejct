//ready 호출//
$(document).ready(function () {
  //getobjectList 와 같다//
  var objectlist = getObjectList()

  //objectlist길이가 0일때//
  if (objectlist.length == 0) {

    // alert문자열 정의//
    var s = `<div class="alert alert-danger col-lg" role="alert">
      Object Stroage is empty! 
  </div>`
  //뒤에 object-list추가//
    $(".object-list").append(s)
    return
  }
//V에서 objectlist까지 반복//
  for (V of objectlist) {
    //아래 문자열은 elements에서 설명함//
    var s = `<div class="col-12 col-md-6" style="margin-bottom:30px">
  <div class="card">
           <h5 class="card-header">`+ V.title + '<div class=" float-right badge ' + (V.success ? ' badge-success' : ' badge-danger') + '">' + (V.success ? "SAME" : "DIFF") + `</div> </h5>
          <div class="card-body">
            <div class="row">
 
            <div class="col-xl-6">
            <img class="col"src="`+ V.image + `"style=" padding-bottom:30px; margin: auto;">
            </div>
            <div class="col-12 col-xl-6">
            <div class="row">
            
              <div class="col-12">
              <div class="card border-secondary" style=" margin-bottom: 20px;">
                <div class="card-header">Com</div>
                <div class="card-body text-secondary">
                    <P style= "height:50px" class="overflow-auto">`+ V.objects.ai + `</P>
                </div>
                </div>
              </div>  
              <div class="col-12">
                <div class="card border-secondary" style=" margin-bottom: 20px;">
                  <div class="card-header">Hum</div>
                  <div class="card-body text-secondary">
                    <P style="height:50px" class="overflow-auto">`+ V.objects.hum + `</P>
                  </div>
                </div>
              </div>  
            </div>
            
            
            </div>
            
            </div>
            <button id="delete_button" type="button" style="font-size: 30px; color: black;" class="btn btn-link fa fa-trash" aria-hidden="true" card_id="`+ V.id +`"></button>

          </div>
      </div>`
      // 뒤에 object-list추가//
    $(".object-list").append(s)
  }
})

// delete_button 누를시 on 호출//
$(document).on('click', '#delete_button',function () {
  //are you sure?나오면서 yes or no 출력//
  if (!confirm("are you sure?"))
    return
// 선택한 ObjectList카드 제거//
  removeObjectList($(this).attr("card_id"))
//새로고침//
  location.reload()

})