<?php
//todo: some environment checkings
function env_check(){
//    if (in_array('mod_rewrite', apache_get_modules())){
//        echo 'mod_rewrite is installed';
//    } else {
//        echo 'mod_rewrite is NOT installed';
//    }
    return true;
}

/**
 * @param $request
 * @return mixed|string
 */
function sanitize($request){
    $request = trim($request);
    $request = strtolower($request);
    $request = filter_var($request, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH | FILTER_FLAG_STRIP_LOW);

    return $request;
}

var_dump($_GET);
var_dump($_POST);

if (!($_GET['f'])){
    //exit
} else {
    env_check();

    //todo: sanityze and other security staff
    $request = sanitize($_GET['f']);

    echo '<pre>';
    var_dump($request);
    echo '</pre>';
    switch ($request){
        case 'admin':
            echo 'admin';
            break;
        case 'init':
            echo 'init';
            break;
        case 'edit':
            echo 'edit';
            break;
        default:
            break;
    }
}
