/**
 * Created by HelenYin on 2016/4/21.
 */

//关闭联系我们的滑出框
var closeContact = $("#close-contact");
var contactPage = $(".contact-page");
var popMask = $(".popMask");
closeContact.click(function(){
    contactPage.css("right","-850px");
    setTimeout(function(){
        popMask.fadeOut()
    },400);
});