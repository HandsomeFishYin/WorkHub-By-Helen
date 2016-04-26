/**
 * Created by HelenYin on 2016/4/21.
 */

//关闭联系我们的滑出框
var closeContact = $("#close-contact");
var contactPage = $(".contact-page");
var popMask = $(".popMask");
var footerContact = $("[contact=footer-contact]")

closeContact.click(function(){
    contactPage.css("right","-850px");
    setTimeout(function(){
        popMask.fadeOut(200)
    },400);
});

function showContactMask(){
    popMask.fadeIn(200);
    setTimeout(function(){
        contactPage.css("right","0");
    },400);
}

$(function(){
    popMask.hide();
    footerContact.click(function(){
        showContactMask();
    });

});