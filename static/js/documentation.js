//! Variable

let scrlSmSiz = 567;

let prCd = document.querySelectorAll('code');

let elmIdHsDcmnt = $('div[id]').slice(2, Infinity);

//! DOM Event

$(window).on('resize', deWndwRsizHandler);

$('.collapse').last().on('click', deLstClpsClckHandler);

$(window).on('scroll', {foo : 'bar'}, deWndwScrlHandler);

//! DOM Event Handler

function deWndwRsizHandler() {
    nvBrClpsHid();
}

function deLstClpsClckHandler() {
    event.preventDefault();
    
    let elm = event.target;
    let elmTrgt = elm.href.split('#')[1];
    let scrlVal = $('#' + elmTrgt).offset().top;
    scrlVal = elm.href == window.location + '#' + elmTrgt ?  scrlVal - 80 : scrlVal - 50;

    $('html, body').animate({ scrollTop: scrlVal }, 300);
}

function deWndwScrlHandler() {
    for (let i = 0; i < elmIdHsDcmnt.length; i++) {
        const element = elmIdHsDcmnt[i];
        let top = $(element).offset().top;
        let bottom = $(element).height() + top;

        if ($(window).scrollTop() + 80 > top && $(window).scrollTop() < bottom){
            $('.collapse a').removeClass('active');
            $('.collapse a[href*="#' + $(element).attr('id') + '"]').addClass('active');
        }
    }
}

//! Aditinal Functions

function nvBrClpsHid(){
    if($(window).width() >= scrlSmSiz){
        $('nav .navbar-collapse-sm').attr('style', 'display: none !important;');
    }else{
        $('nav .navbar-collapse-sm').attr('style', '');
    }
}

(function trmPrCdCntnt() {
    prCd.forEach(element => {
        element.innerHTML = element.innerHTML.trim();
    });
})();

//! Aditinal Call

nvBrClpsHid();