//! Variables

let urlRegx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

let dElFrmContnr = $('.container');

let dElFrm = $('form');

let dElFrmUrlInp = $('form #url');

let dElFrmPswrdInp = $('form #password');

let dElSctn = $('section');

let tBdy = $('tbody');

let pyLodFrmAjx = null;

//! DOM Event

dElFrm.on('submit', {foo : 'bar'}, deFrmSbmtHandler);

//! DOM Evet Handler

function deFrmSbmtHandler() {
    event.preventDefault();
    if (dElFrmUrlInp.val() === '' || dElFrmPswrdInp.val() === ''){
        $('form .alert-danger').html('Please fill out the field below!').css('display', 'block')
    }else{
        shwLdngIcnAndRmvFrm();
        sndRqstToShrtnrLLog();
    } 
}

//! Aditinal function

function shwLdngIcnAndRmvFrm() {
    dElFrmContnr.css('display', 'none');
    dElSctn.append('<img src="../static/images/loading.svg" draggable="false">').css('display', 'flex');
}

function hidLdngIcnAndRmvFrm() {
    $('section h1').css('display', 'none');
    $('section img').css('display', 'none');
}

function sndRqstToShrtnrLLog() {
    $.post("/logs", {
        "url" : dElFrmUrlInp.val(),
        "password" : dElFrmPswrdInp.val()
        },
        function(data){
            pyLodFrmAjx = Object.values(data);
            data = undefined;
            delete(data);
        }
    )
    .fail(function() {
        hidLdngIcnAndRmvFrm();
        $('section .alert-danger').html('Somethin went wrong! Error : Unknown').css('display', 'block');
        return false;
    })
    .done(function () {
        hidLdngIcnAndRmvFrm();
        if (typeof pyLodFrmAjx == 'object'){
            addRwsToTbl();
        }else{
            $('section .alert-danger').html('Something went wrong! Error : Can\'t fetch data from server, Try again').css('display', 'block');
        }
    })
}

function addRwsToTbl() {
    for (let x of pyLodFrmAjx[0]){
        $('tbody').append(`
            <tr>
                <td>${x.browser}</td>
                <td>${x.date}</td>
                <td>${x.platform}</td>
                <td>${x.referrer}</td>
                <td>${x.time}</td>
            </tr>
        `);
    }
    $('section, section h1, section .tbl-header, section .tbl-content').css('display', 'block')
}