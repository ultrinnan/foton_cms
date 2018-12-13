let photon_result;

function photon_wrapper() {


}

//some init actions here
function init(){
    var photon_top = document.createElement('div');
    photon_top.className = 'photon_top';
    photon_top.style.cssText = 'width:100%;min-height:100px;background:#fff;padding:8px 16px;';
    photon_top.innerHTML = '<hr><h2>Photon CMS installation</h2><hr><h5>you can always refer to the <a href="https://fedirko.pro/solutions/photon" target="_blank">manual</a> for any help.</h5><hr><style>\n' +
        '                        #f_form{\n' +
        '                            text-align: center;\n' +
        '                            max-width: 750px;\n' +
        '                            margin: auto;\n' +
        '                        }\n' +
        '                        .f_dark_button {\n' +
        '                            color: #39675a;\n' +
        '                            border: 2px solid #39675a;\n' +
        '                            text-transform: uppercase;\n' +
        '                            padding: 8px 16px;\n' +
        '                            border-radius: 2px;\n' +
        '                            display: inline-block;\n' +
        '                            background: white;\n' +
        '                        }\n' +
        '                        .f_dark_button:hover {\n' +
        '                            color: #fff;\n' +
        '                            background: #39675a;\n' +
        '                            transition: .5s;\n' +
        '                        }\n' +
        '                    </style>\n' +
        '                    <form id="f_form" method="post">\n' +
        '                        <input type="hidden" name="f" class="f_input" value="init">\n' +
        '                        <input type="hidden" name="f_" class="f_input" value="init">\n' +
        '                        <p>\n' +
        '                            <label for="username">Admin username:</label>\n' +
        '                            <input type="text" name="username" id="username" class="f_input" value="">\n' +
        '                        </p>\n' +
        '                        <p>\n' +
        '                            <label for="password">Admin password:</label>\n' +
        '                            <input type="password" name="password" id="password" class="f_input" value="">\n' +
        '                        </p>\n' +
        '                        <button class="f_dark_button">Create account for Administrator and init Photon CMS</button>\n' +
        '                    </form><hr>';

    document.body.insertAdjacentElement('afterbegin', photon_top);

    let f_form = document.getElementById('f_form');
    f_form.addEventListener('submit', function (e) {
        e.preventDefault();
        ajax_post();
    })
}

function sanitize(str) {
    str = encodeURI(str.trim().toLowerCase());
    return str;
}

/**
 * Performs GET request and stores it in temp variable
 * @param params - string of GET params
 */
function ajax_get(params) {
    let f_url = '/photon/photon.php?' + params;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange=function() {
        if (this.readyState === 4 && this.status === 200) {
            photon_result = this.responseText;
        }
    };
    xmlHttp.open("GET", f_url, true);
    xmlHttp.send();
}

function ajax_post(){
    let elements = document.getElementsByClassName("f_input");
    let formData = new FormData();
    for(let i=0; i<elements.length; i++)
    {
        formData.append(elements[i].name, elements[i].value);
    }
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200)
        {
            alert(xmlHttp.responseText);
        }
    };
    xmlHttp.open("POST", "/photon/photon.php");
    xmlHttp.send(formData);
}

/**
 * get action from address line, perform basic sanitizing and send/receive actions
 */
function action() {
    let params = window.location.search.substr(1).split("&");
    let action = sanitize(params[0]);
    if (action.includes('f=')){
        //send request to front or back
        ajax_get(action);
        //fucking js ajax is faster than 0 milliseconds. yes, it's js babe...
        setTimeout(function () {
            process(photon_result);
        }, 0);
    }
}

function process(result){
    console.log(result);
    init();
}

document.addEventListener("DOMContentLoaded", function(event) {
    // console.log('Photon is ready!');
    action();

    // // example request
    // ajax_get('../photon.php/?p1=1&p2=Hello+World', function(data){ console.log(data); });
    //
    // ajax_get('../photon.php/?p1=1&p2=Hello+World', function(data){
    //     var json = JSON.parse(data);
    //     console.log(json);
    // });

});