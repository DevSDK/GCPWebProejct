var image = null
var hu_objs = null
var ai_objs = null
var ratio = 1
function getBase64(file, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        callback(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }


$(document).on('input', '#uploadfile', function() {
    var text = $(this).val()
    if(text.length > 62)
        text = "..."+text.substring(text.length - 62 , text.length)
    $("#file-label").text(text)
})

$(function() {  
    $("#uploadfile").change(function () {
        getBase64(this.files[0] ,function(ret) {
            var ctx = $("#canv")[0].getContext("2d");
            image= new Image()
            image.onload = function() {
                ctx.canvas.width= 650;
                ctx.canvas.height= 450;
                var hRatio = ctx.canvas.width / image.width;
                var vRatio = ctx.canvas.height / image.height;
                var ratio1  = Math.min ( hRatio, vRatio);
                ratio = ratio1
              ctx.drawImage(image, 
                0, 0, image.width * ratio1, image.height*ratio1);
            };
            image.src=ret
        })
    });
 });


$("#image-submit").click(function() {
    if(image == null)
        return
    if($('imp-text') == null)
        return
$.ajax (
    {
    url:"https://vision.googleapis.com/v1/images:annotate?key=",
    async:true,
    type:'POST',
    dataType:'json',    
    contentType:"application/json",
    data: JSON.stringify (   
        {
    
            requests:[
            {
                image:{
                        content:image.src.split(',')[1]
                },

                features:[
                    {
                        type:"OBJECT_LOCALIZATION"
                    }
                ]
            }

        ]
    }
    )
    ,
success:function(res) {
    $('#aiexp').text('')
    $('#huexp').text('')
    var ctx = $("#canv")[0].getContext("2d");

    var ai = []
    for(rs of res.responses) {
        for(var obj of rs.localizedObjectAnnotations) {
            var s = obj.name + "(" +Math.round(obj.score*100)+ "%)"
            $("#aiexp").append(s  + ", ")
            ai.push(s)
                v = obj.boundingPoly.normalizedVertices;
                w = Math.abs(v[0].x - v[1].x)
                h = Math.abs(v[0].y - v[2].y)

                ctx.beginPath()
                ctx.strokeStyle="red"
                ctx.rect(v[0].x*ratio * image.width, v[0].y*ratio*image.height, w*ratio*image.width,h*ratio*image.height)
                ctx.stroke()        
                ctx.fillStyle = 'red'
                ctx.font = "15px Arial"
                ctx.fillText(obj.name, v[0].x*ratio * image.width , v[0].y*ratio*image.height - 5)
        }
    }

    var texts=  $("#inp-texts").val().trim().split(',')
    var hu = []
    for(i in texts)
    {
        hu.push(texts[i])
        if(i == texts.length-1)
            $('#huexp').append(texts[i])
        else
            $('#huexp').append(texts[i]+ ", ")   
    }
    hu_objs = hu
    ai_objs = ai    
    
}

})})


$('#savebutton').click(function() {
    var correction = false  
    if($('input:radio[name="radio"]:checked').attr('id') == "radio-true")
        correction = true
    else
        correction = false

    var ctx = $("#canv")[0].toDataURL()
    var title = $("#title-inp").val()
    addObjectList(title,ctx, ai_objs,hu_objs, correction)
    alert("saved")
    location.reload()

})
