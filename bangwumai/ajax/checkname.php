<?php
    // 获取传过来的参数  -- regname
    $regname = $_REQUEST['regname'];
    $result = 'no';
    $arr = array('zhangsan', 'lisi', 'wangwu', 'maliu');

    foreach ($arr as $name) {
        if ($name == $regname) {
            $result = 'yes';
        }
    }

    echo $result;