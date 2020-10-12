const dotenv = require("dotenv").config();
const port = process.env.PORT;
const apiPath = 'http://api.bpnhs.org:' + port;

//Check logged in
$.ajax({
    type: 'get',
    url: apiPath + '/currentUser',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    success: (data) => {
      if(!data.name) {
        location.href = '/login';
      } 
    }
  })

//hours request submission
$("#hours-request").submit((e) => {
    e.preventDefault();
    let data = new FormData($("#hours-request")[0]);
    console.log(data.get('event-pic'));
    $.ajax({
        type: 'post',
        url: apiPath + '/submithours',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        data: data,
        processData: false,
        contentType: false,
        success: function (res) {
            console.log(res);
            if(res.status == "success") { 
                location.href = "dashboard"
            }   
        }
    });
});

//Event name search 
$("#event-select").unbind();
$("#event-select").keyup((e) => { 
    if(e.which != 16) { 
        $("#event-list").html('');
        $.get(apiPath+ "/eventslike/" + e.target.value, (res) => {
            res.forEach((event) => {
                $("#event-list").append($('<option/>').text(event.event_name));
            });
        });
    }
});

//event signup submission
$("#event-signup").submit((e) => {
    e.preventDefault();
    if(grecaptcha.getResponse() != "") {
        let data = $("#event-signup").serialize();
        $.post(apiPath + "/eventsignup", data, (res) => {
            console.log(res);
            if(res.status = "success") { 
                //location.href = "dashboard";
            }
        });
    }
});