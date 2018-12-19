<?php
$result = [
    'result' => 'error',
    'text' => 'unknown request'
];

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

function init($login = null, $password = null){
    $path = realpath(dirname(__FILE__)).'/';
    $new_a = $path . "photon.a";
    if (file_exists($new_a)){
        return [
            'result' => 'error',
            'text' => 'Photon is already initialized.'
        ];
    } else if($login && $password) {
        $admin = fopen($new_a, 'w');
            //todo: write credentials to file
        $hash = password_hash($password, PASSWORD_DEFAULT);
        fwrite($admin, $login . '=' . $hash);
        fclose($admin);
        return [
            'result' => 'ok',
            'text' => 'Photon is successfully initialized.'
        ];
    } else {
        return [
            'result' => 'ok',
            'text' => 'init'
        ];
    }
}

if ($_GET){
    if ($_GET['f']){
        env_check();
        //todo: sanityze and other security staff
        $request = sanitize($_GET['f']);

        switch ($request){
            case 'init':
                $result = init();
                break;
            case 'edit':
                echo 'edit';
                break;
            default:
                break;
        }
    }
} else if ($_POST){
    if ($_POST['f']){
        foreach ($_POST as $item){
            $request[] = sanitize($item);
        }
        echo '<pre>';
        var_dump($request);
        echo '</pre>';
        switch ($request){
            case 'init':
                return $response = init();
                break;
            case 'edit':
                echo 'edit';
                break;
            default:
                break;
        }
    }
}

echo json_encode($result);
exit;