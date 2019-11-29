var ratio = 1
var image = null
var submited = false;
var ai_exp = {}
var hum_exp = {}
var successFlag = false
$(document).on('input', '#uploadfile', function() {

        $("#file-label").text($(this).val())
})

$(document).on('input', '#joy-range', function() {
    $('#joy_label').text( "Joy(" +  ($(this).val() * 25 + "%)" ))
});
$(document).on('input', '#anger-range', function() {
    $('#anger_label').text( "Anger(" +  ($(this).val() * 25 + "%)" ))
});
$(document).on('input', '#surprise-range', function() {
    $('#surprise_label').text( "Surprise(" +  ($(this).val() * 25 + "%)" ))
});
$(document).on('input', '#sad-range', function() {
    $('#sad_label').text( "Sad(" +  ($(this).val() * 25 + "%)" ))
});


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

function getStatusByString(s) {
    switch(s) {
        case "UNKNOWN":
            return 0;
        case "VERY_UNLIKELY":
            return 0;
        case "UNLIKELY":
            return 25;
        case "POSSIBLE":
            return 50;
        case "LIKELY":
            return 75;
        case "VERY_LIKELY":
            return 100;
    }
}

$(function() {  
    $("#uploadfile").change(function () {
        getBase64(this.files[0] ,function(ret) {
            var ctx = $("#canv")[0].getContext("2d");
            image= new Image();


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
                            type:"FACE_DETECTION"
                        }
                    ]
                }

            ]
        }
        )
        ,
    success:function(res) {
        var ctx = $("#canv")[0].getContext("2d");
        for(var rs in res.responses)
        {
            for(var i in res.responses[rs].faceAnnotations)
            {
                var fano = res.responses[rs].faceAnnotations[i];
                v = fano.boundingPoly.vertices;
                w = Math.abs(v[0].x - v[1].x)
                h = Math.abs(v[0].y - v[2].y)

                ctx.beginPath()
                ctx.strokeStyle="red"
                ctx.rect(v[0].x*ratio, v[0].y*ratio, w*ratio,h*ratio)
                ctx.stroke()        
                
                var ai_joy = getStatusByString(fano.joyLikelihood)
                var ai_sad = getStatusByString(fano.sorrowLikelihood)
                var ai_anger = getStatusByString(fano.angerLikelihood)
                var ai_surprise = getStatusByString(fano.surpriseLikelihood)
                var hu_joy = $("#joy-range").val() * 25
                var hu_anger = $("#anger-range").val() * 25
                var hu_surprise = $("#surprise-range").val() * 25
                var hu_sad = $("#sad-range").val() * 25
                
                ai_exp = {joy:ai_joy, anger:ai_anger, surprise:ai_surprise, sad:ai_sad}
                hu_exp = {joy:hu_joy, anger:hu_anger, surprise:hu_surprise, sad:hu_sad}

                $("#ai-joy>.progress-bar").css("width", ai_joy +"%");
                $("#ai-joy>.progress-bar").text(ai_joy+"%")
                $("#ai-sorrow>.progress-bar").css("width", ai_sad +"%");
                $("#ai-sorrow>.progress-bar").text(ai_sad+"%")

                $("#ai-anger>.progress-bar").css("width", ai_anger +"%");
                $("#ai-anger>.progress-bar").text(ai_anger+"%")

                $("#ai-surprise>.progress-bar").css("width", ai_surprise +"%");
                $("#ai-surprise>.progress-bar").text(ai_surprise+"%")


                $("#hu-joy>.progress-bar").css("width", hu_joy+"%");
                $("#hu-joy>.progress-bar").text(hu_joy+"%")
                $("#hu-anger>.progress-bar").css("width", hu_anger+"%");
                $("#hu-anger>.progress-bar").text(hu_anger+"%")
                $("#hu-surprise>.progress-bar").css("width", hu_surprise+"%");
                $("#hu-surprise>.progress-bar").text(hu_surprise+"%")
                $("#hu-sad>.progress-bar").css("width", hu_sad+"%");
                $("#hu-sad>.progress-bar").text(hu_sad+"%")

                if(ai_joy == hu_joy && ai_anger == hu_anger &&
                ai_sad == hu_sad && ai_surprise == hu_surprise)
                {
                    $("#res-label").removeClass("badge-info")
                    $("#res-label").removeClass("badge-danger")
                    $("#res-label").addClass("badge-success")                           
                    $("#res-label").text("SUCCESS")
                    successFlag = true;
                }
                else{
                    $("#res-label").removeClass("badge-info")
                    $("#res-label").removeClass("badge-success")
                    $("#res-label").addClass("badge-danger")                            
                    $("#res-label").text("FAIL")
                    successFlag=false;
                }
                submited = true;
                return;
            }
        }
        
    }
        }
    )
 })


$("#savebutton").click(function()
{
    if(image == null || !submited)
        return
    if($("#title-inp").val().length == 0)
        return
    var ctx = $("#canv")[0].toDataURL()
    var title = $("#submited").val()
    addFaceList(title,ctx, ai_exp,hum_exp, successFlag)
    alert("saved")
    location.reload()
})