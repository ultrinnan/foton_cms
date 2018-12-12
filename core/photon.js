function init(){
    console.log('Init Photon CMS...');
}

function get_params() {
    let params = window.location.search.substr(1).split("&");
    console.log(params[0]);
}

function getAjax(url) {
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
    }).catch(function() {
        console.log("Booo");
    });
}

// example request
getAjax('../core/photon.php/?p1=1&p2=Hello+World', function(data){ console.log(data); });

getAjax('../core/photon.php/?p1=1&p2=Hello+World', function(data){
    var json = JSON.parse(data);
    console.log(json);
});

function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

// example request
postAjax('../core/photon.php', 'p1=1&p2=Hello+World', function(data){ console.log(data); });

// example request with data object
postAjax('../core/photon.php', { p1: 1, p2: 'Hello World' }, function(data){ console.log(data); });

document.addEventListener("DOMContentLoaded", function(event) {
    console.log('Photon is ready!');
    init();
    get_params();

});