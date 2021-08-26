//! Variable

let scrlSmSiz = 576;

let dElFstShrtnrOfstTp = $('.fast-shortener').offset().top;

let dElFstShrtnrPswrdInp = $('.fast-shortener .password-input-container input');

let dElFstShrtnrUrlInp = $('.fast-shortener .url-input-container input');

let urlRegx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

//! DOM Event

$(window).on('resize', deNvBrClpsHidHandler);

$('#get-started').on('click', deGtStrtdBtnClckHandler);

$('.next-btn').on('click', deUrlInpMovrToLft);

$('.previous-btn').on('click', deUrlInpMovrToRigt);

$('.fast-shortener form').on('submit', {far : 'boo'}, defstShrtnrSubHandler);

function deCpyShrtLnkBtnClck() {
    $('.fast-shortener .copy-btn').on('click', deCpyShrtLnkBtnClckHandler);
}

//! DOM Event Handler

function deNvBrClpsHidHandler(){
    if((window.innerWidth + 16) >= scrlSmSiz){
        $('.navbar-collapse-sm').attr('style', 'display: none !important;');
    }else{
        $('.navbar-collapse-sm').attr('style', '');
    }
}

function deGtStrtdBtnClckHandler(){
    $('html, body').stop(true, true).delay(200).animate({scrollTop : String(dElFstShrtnrOfstTp)}, 500);
}

function deUrlInpMovrToLft(){
    $('.url-input-container').css('left', '-200%');
    $('.password-input-container').css('right', '0');
}

function deUrlInpMovrToRigt(){
    $('.url-input-container').css('left', '0');
    $('.password-input-container').css('right', '-200%');
}

function defstShrtnrSubHandler(){
    event.preventDefault();
    if (dElFstShrtnrUrlInp.val() == ''){

        $('.fast-shortener .alert-danger').html('Please enter a URL to make shorten!').addClass('d-block');

    }else if(!urlRegx.test(dElFstShrtnrUrlInp.val())){

        $('.fast-shortener .alert-danger').html('Please enter a valid URL to make shorten!').addClass('d-block');

    }else{
        sndRqstToShrtnr();
    }
}

function deCpyShrtLnkBtnClckHandler() {
    copyToClipboard($('.fast-shortener .alert-secondary a').attr('href'));
    $('.fast-shortener .copy-btn').html('Copied!').addClass('bg-primary text-white');
    setTimeout(()=>{
        $('.fast-shortener .copy-btn').html('Copy').removeClass('bg-primary text-white');
    }, 2000);
}

//! Aditinal Functions

function  sndRqstToShrtnr() {
    $.post("/make", {
        url: dElFstShrtnrUrlInp.val(), // add the url
        password: dElFstShrtnrPswrdInp.val()// add password if there is or else do not add it in the request
      },
      function(data){
          let html = `<button type="button" class="btn btn-outline-primary mr-5 copy-btn">Copy</button>
          <p class="mb-0 pt-2"><a href="${data}">${data}</a></p>`;

          $('.fast-shortener .alert-danger').removeClass('d-block');
          $('.fast-shortener .alert-secondary').html(html).addClass('d-flex');

          CpyShrtLnkBtnClck(); // To find element (btn) when it will be added to documnet
      })
      .fail(function(x) {
        $('.fast-shortener .alert-danger').html(`Somethin went wrong! Error : ${x}`).addClass('d-block');
      });
}

function copyToClipboard(str) {
    let el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

//! Aditinal Call

deNvBrClpsHidHandler();