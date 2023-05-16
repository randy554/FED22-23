function createInvitationCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readInvitationCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

var typeformLink = '';
var randomNumber = Math.floor(Math.random() * 100) + 1;
var currentLink = location.href;
if(currentLink.indexOf('https://www.tele2.nl/klantenservice') > -1 || currentLink.indexOf('https://www.tele2.nl/my') > -1){
    splitAndViewCount(100, 15000, 10000);
}
else if (currentLink.indexOf('product') === -1) {
    splitAndViewCount(50, 20000, 10000);
}

function splitAndViewCount(chance, firstViewDuration, secondViewDuration) {
    var surveyChance = chance;
    var showSurveyAfterMsFirstView = firstViewDuration;
    var showSurveyAfterMsSecondView = secondViewDuration;
    if (readInvitationCookie('mopinionSurveyFinished') === null && readInvitationCookie('mopinionSurveyInvitation') === '2') {
        createInvitationCookie('mopinionSurveyFinished', 'true', 90);
        if(randomNumber < surveyChance){
            getSurveyDetails('second-view', showSurveyAfterMsSecondView);
        }
    }
    else if (readInvitationCookie('mopinionSurveyFinished') === null && readInvitationCookie('mopinionSurveyInvitation') !== '2') {
        createInvitationCookie('mopinionSurveyInvitation', '2', 90);
        if(randomNumber < surveyChance){
            getSurveyDetails('first-view', showSurveyAfterMsFirstView);
        }
    }
}

function getSurveyDetails(viewCount, timeOutDuration) {
    var currentUrl = location.pathname;
    var isMobile = '&DEVICE=DESKTOP'; //initiate as false
    var isOs = '&OS=UNKNOWN'; //initiate as unknown
    var isBrowser = '&Brow=UNKNOWN'; // initiate as unknown
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = '&DEVICE=MOBILE';
    }
    // OS detection
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
        isOs = '&OS=Android';
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        isOs = '&OS=iOs';
    } else if (navigator.appVersion.indexOf("Win") != -1) {
        isOs = '&OS=Windows';
    } else if (navigator.appVersion.indexOf("Mac") != -1) {
        isOs = '&OS=Mac';
    }
    // Browser detection
    navigator.sayswho = (function() {
        var ua = navigator.userAgent,
            tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            isBrowser = '&Brow=IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge?)\/(\d+)/);
            if (tem != null) isBrowser = '&Brow=' + tem.slice(1).join(' ').replace('OPR', 'Opera').replace('Edg ', 'Edge ');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        isBrowser = '&Brow=' + M.join(' ');
    })();
    typeformLink = 'https://t-mobile.mopinion.com/survey/public/take-survey/898638767a70550e296c7805024f8a2b4020d7c6?URL=' + currentUrl + isMobile + isOs + isBrowser;; // DE LINK VAN DE TYPEFORM 
    placeForm(typeformLink, viewCount, timeOutDuration);
}

function showTypeform(viewCount, timeOutDuration) {
    $('.typeform-container').animate({ "bottom": "0px" }, "slow");
    ga('create', 'UA-16365473-1', 'auto');
    ga('send', 'event', 'Mopinion invitation', 'view', 'survey - shown (' + viewCount + ' & 50% & ' + timeOutDuration + 'ms)', { 'nonInteraction': 1 });
}

function placeForm(link, viewCount, timeOutDuration) {
    if (matchMedia !== undefined) {
        var mediaQuery = window.matchMedia("(max-width: 767px)");
        if (mediaQuery.matches) {
            $('head').append('<style>.typeform-container{bottom: -392px; z-index: 1000;background:#fff;position:fixed;width:300px;padding:30px;right:0;-webkit-box-shadow:0 0 8px rgba(0,0,0,.08);box-shadow:0 0 8px rgba(0,0,0,.08)}.typeform-choices{display:block}.typeform-choices a{display:inline-block}.typeform-container .btn{margin:0px;} .typeform-container .first-line{margin-bottom:10px;}</style>');
        } else {
            $('head').append('<style>.typeform-container{bottom: -392px; z-index: 1000; background:#fff;position:fixed;width:300px;padding:30px;right:0;-webkit-box-shadow:0 0 8px rgba(0,0,0,.08);box-shadow:0 0 8px rgba(0,0,0,.08)}.typeform-choices{display:block}.typeform-choices a{display:inline-block}</style>');
        }
        if ($('.typeform-container').length === 0) {
            $('body').append('<div class="typeform-container"> <h3 class="survey-title">Jij maakt onze website beter!</h3> <p class="survey-content">We willen onze website zo goed mogelijk maken. En daar hebben we jouw hulp bij nodig.</p><p class="survey-content">Geef je mening over je bezoek zodat wij weten wat beter kan en moet.</p><p>Doe je mee?</p><div class="typeform-choices"> <a class="button-small text-small button-light-blue typeform-accept" href="#"><span>Ja, ik doe mee</span></a> <button class="button-outline-light-blue button-small typeform-deny">Nee, dank je</button> </div></div>');
        }

        setTimeout(showTypeform, timeOutDuration, viewCount, timeOutDuration);

        $('.typeform-deny, .typeform-accept').click(function(e) {
            e.preventDefault();
            $('.typeform-container').fadeOut();
            createInvitationCookie('mopinionSurveyFinished', 'true', 90);
            ga('create', 'UA-16365473-1', 'auto');
            if ($(this).attr('class').indexOf('deny') > -1) {
                ga('send', 'event', 'mopinion invitation', 'click', 'Survey - denied');
            } else if ($(this).attr('class').indexOf('accept') > -1) {
                if (matchMedia !== undefined) {
                    var mediaQuery = window.matchMedia("(max-width: 767px)");
                    if (mediaQuery.matches) {
                        window.open(link, 'mopinionSurvey');
                    } else {
                        window.open(link, 'mopinionSurvey', 'width = 450, height = 700');
                    }
                }
                ga('send', 'event', 'mopinion invitation', 'click', 'Survey - accepted');
            }
        });
    }
}