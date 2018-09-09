function  submitQuery(action, levelIndex = 1) {

var level = null;
        if (levelIndex == "1") {
level = $(action).parent().parent();
        }

var name = $.trim($(level).find(".name").val());
        var number = $.trim($(level).find(".number").val());
        var email = $.trim($(level).find(".email").val());
        var budget = $.trim($(level).find(".budget").val());
        var requirement = $.trim($(level).find(".requirement").val());
        if (name.length < 1) {
$(".error").show();
        $(".error").html("Please enter your name.");
        } else if (number.length < 10) {
$(".error").show();
        $(".error").html("Please enter a valid number.");
        } else if (!validate(email)) {
$(".error").show();
        $(".error").html("Please enter a valid email address.");
        } else if (budget == "0") {
$(".error").show();
        $(".error").html("Please choose your budget.");
        } else if (requirement.length < 1) {
$(".error").show();
        $(".error").html("Please enter your requirement.");
        } else {
$(".error").hide();
        $(action).text("Please Wait....");
        $(action).val("Please Wait....");
        $.ajax({url: "https://www.chromeinfotech.net/sendmailer.php",
                data: {
                "firstname": name,
                        'lastname': '',
                        "email": email,
                        "contact": number,
                        "skype": '',
                        "budget": budget,
                        "source": '',
                        "technology": '',
                        "description": requirement
                },
                dataType: 'jsonp',
                headers: {'Access-Control-Allow-Origin': '*'},
                success: function (result) {

                    window.location.href = 'https://www.howtocreateanapp.co/thank-you.html';
                },
                error: function (result) {

                    window.location.href = 'https://www.howtocreateanapp.co/thank-you.html';
                }
        });
        }

return false;
}


function validate(email) {

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    //var address = document.getElementById[email].value;
    if (reg.test(email) == false)
    {
        return false;
    } else {
        return true;
    }
}