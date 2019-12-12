//Define variables
var image = null
var hu_objs = null
var ai_objs = null
var ratio = 1

//Convert image to base64 encoded image
function getBase64(file, callback) {
    //using renderer class
    var reader = new FileReader();
    //call Render as URL 
    reader.readAsDataURL(file);
    //Call back to caller
    reader.onload = function () {
        callback(reader.result);
    };
    //Error callback
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

//Event handler for fileupload changed
$(document).on('input', '#uploadfile', function () {
    //Get text
    var text = $(this).val()
    //Text length limit is 64
    if (text.length > 62)
        //Remove long string of filename
        text = "..." + text.substring(text.length - 62, text.length)
    //Change text in #file-label
    $("#file-label").text(text)
})

//Event handler for fileupload
$(function () {
    //Event handler
    $("#uploadfile").change(function () {
        //Change to base64
        getBase64(this.files[0], function (ret) {
            //Get canvas context
            var ctx = $("#canv")[0].getContext("2d");
            //Create Image class instance
            image = new Image()
            //assign callback function on load
            image.onload = function () {
                //set size width
                ctx.canvas.width = 650;
                //set size height
                ctx.canvas.height = 450;
                //calculate ratio
                var hRatio = ctx.canvas.width / image.width;
                //calculate raito
                var vRatio = ctx.canvas.height / image.height;
                //calculate raito
                var ratio1 = Math.min(hRatio, vRatio);
                //assign to global variable
                ratio = ratio1
                //Image draw 
                ctx.drawImage(image,
                    0, 0, image.width * ratio1, image.height * ratio1);
            };
            //Set image
            image.src = ret
        })
    });
});

//Event handler for #image-submit button
$("#image-submit").click(function () {
    //Check nullpointer
    if (image == null)
        return
    //Check empty text    
    if ($('imp-text') == null)
        return
    //AJAX HTTP REQUEST
    $.ajax(
        {
            //set url with api key
            url: "https://vision.googleapis.com/v1/images:annotate?key=",
            //Turn on async
            async: true,
            //Request type
            type: 'POST',
            //Data type
            dataType: 'json',
            //Content Type
            contentType: "application/json",
            //Set string data using JSON.stringify
            //Following structure is GCP reqeust speicfication. 
            data: JSON.stringify(
                {
                    requests: [
                        {
                            image: {
                                content: image.src.split(',')[1]
                            },

                            features: [
                                {
                                    type: "OBJECT_LOCALIZATION"
                                }
                            ]
                        }

                    ]
                }
            )
            ,
            //Success callback
            success: function (res) {
                //Clear results
                $('#aiexp').text('')
                //Clear results
                $('#huexp').text('')
                //get context from canvas
                var ctx = $("#canv")[0].getContext("2d");
                //Declare array
                var ai = []
                //Foreach responses 
                for (rs of res.responses) {
                    //Foreach every objects
                    for (var obj of rs.localizedObjectAnnotations) {
                        //Get percentage
                        var s = obj.name + "(" + Math.round(obj.score * 100) + "%)"
                        //Set text
                        $("#aiexp").append(s + ", ")
                        //push to array
                        ai.push(s)
                        //Get vertices
                        v = obj.boundingPoly.normalizedVertices;
                        //calculate width
                        w = Math.abs(v[0].x - v[1].x)
                        //calculate height
                        h = Math.abs(v[0].y - v[2].y)
                        //draw sequance
                        ctx.beginPath()
                        //set color
                        ctx.strokeStyle = "red"
                        //draw rect
                        ctx.rect(v[0].x * ratio * image.width, v[0].y * ratio * image.height, w * ratio * image.width, h * ratio * image.height)
                        //draw
                        ctx.stroke()
                        //set fill color
                        ctx.fillStyle = 'red'
                        //set font style
                        ctx.font = "15px Arial"
                        //draw text
                        ctx.fillText(obj.name, v[0].x * ratio * image.width, v[0].y * ratio * image.height - 5)
                    }
                }
                //Copy input 
                var texts = $("#inp-texts").val().trim().split(',')
                //Declear array
                var hu = []
                //foreach texts
                for (i in texts) {
                    //Push to array
                    hu.push(texts[i])
                    //check last
                    if (i == texts.length - 1)
                        //append without ,
                        $('#huexp').append(texts[i])
                    else
                        //append with ,
                        $('#huexp').append(texts[i] + ", ")
                }
                //refer to hu
                hu_objs = hu
                //refer to ai
                ai_objs = ai
            }
        })
})

//Event handler for #savebutton
$('#savebutton').click(function () {
    //Declare variable for correction check
    var correction = false
    //checking radio button clicked
    if ($('input:radio[name="radio"]:checked').attr('id') == "radio-true")
        //set true
        correction = true
    else
        //set false
        correction = false
    //canvas to ImageURL
    var ctx = $("#canv")[0].toDataURL()
    //Get title information
    var title = $("#title-inp").val()
    //Call addObjectList in libs/storage.js
    addObjectList(title, ctx, ai_objs, hu_objs, correction)
    //show message "saved"
    alert("saved")
    //refresh page
    location.reload()

})
