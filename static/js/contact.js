'use strict';

//! Variables

let dElFrm = $('form');

let dElFrmNmInp = $('form #name');

let dElFrmEmlInp = $('form #email');

let dElFrmMsgInp = $('form #message');

let dElFrmCptInp = $('form .captcha input');

let dElFrmAlrt = $('form .alert-danger');

let dElFrmAlrtSccss = $('form .alert-success');

let dElFrmCptBtn = $('form .captcha button');

let emlRgx = /[0-9a-zA-Z]+\@+[a-z]+\.+['com']/;

let cptCdX, cptCdY;

//! DOM Event

dElFrm.on('submit', {foo : 'bar'}, deFrmSbmtHandler);

dElFrmCptBtn.on('click', deFrmCptBtnClkHandler);

//! DOM Evet Handler

function deFrmSbmtHandler(){
    event.preventDefault(); //? Prevnts the default action of event (submit)
 
    let x = Symbol.keyFor(cptCdX); //* Read data from Symbol
    let y = Symbol.keyFor(cptCdY); //* Read data from Symbol

    if (dElFrmNmInp.val() == '' || dElFrmEmlInp.val() == '' || dElFrmMsgInp.val() == ''){
        //? If any input is empty
        dElFrmAlrt.html('Error : Please fill out the field below!').css('display', 'block');
    }else if (!emlRgx.test(dElFrmEmlInp.val())){
        //? If email isn't valid
        dElFrmAlrt.html('Error : Please enter a valid E-mail!').css('display', 'block');
    }else if(Number(dElFrmCptInp.val()) !== (Number(x) + Number(y))){
        //? If reCaptcha is not valid
        dElFrmAlrt.html('Error : Please verify that you\'re not a robot!').css('display', 'block');
        addNoToCnvs(); //* To make new ReCaptcha
    }else{
        hidErr(); // Hide error to then send request
        sndRqstToSrvr(); // Send request to server
    }
}

function deFrmCptBtnClkHandler(){
    addNoToCnvs();
}

//! Aditinal function

function rndmNoGnrtr(mx, mn){
    mn = Math.ceil(mn);
    mx = Math.floor(mx);
    return Math.floor(Math.random() * (mx - mn + 1)) + mn;
}

function addNoToCnvs(){
    let x = rndmNoGnrtr(49, 1);
    let y = rndmNoGnrtr(49, 1);

    let canvas = document.getElementsByTagName('canvas')[0];
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "3rem Arial";
    ctx.direction = "ltr";

    ctx.fillText(`${x} + `,  rndmNoGnrtr(1, 70), rndmNoGnrtr(40, 140)); //? Add the number of x
    ctx.fillText(`${y} =`, rndmNoGnrtr(140, 190), rndmNoGnrtr(40, 140)); //? Add the number of y

    //? Save x and y in symbol

    cptCdX = Symbol.for(x); //* Save data in Symbol to make it secure
    cptCdY = Symbol.for(y); //* Save data in Symbol to make it secure
}

function sndRqstToSrvr(){
    $.post('/contact', {
        name : dElFrmNmInp.val(),
        email : dElFrmEmlInp.val(),
        message : dElFrmMsgInp.val()
    },
    function (data){
        console.log(data);
        dElFrmAlrtSccss.html('Form sent successfully!').css('display', 'block');
    }
    );
}

function hidErr() {
    dElFrmAlrt.css('display', 'none');
}

//! Aditinal call

addNoToCnvs();