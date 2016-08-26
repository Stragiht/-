<?php
header('Content-type: text/html;charset=utf-8');
$type = $_GET['type'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "chat";

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

mysql_query('set names utf8');

// 查询记录
if ($type == 'query') {
    $sql = "select * from list";
    $result = $conn->query($sql);
    $data = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    echo json_encode($data);
} else if ($type == 'send') {
    $sender = $_GET['sender'];
    $msg = $_GET['msg'];
    $sql = "insert into list (name, password) values ('$sender', '$msg')";
    if ($conn->query($sql) === TRUE) {
        $data = array(
            'code' => 0,
            'msg'  => '注册成功！'
        );

        echo json_encode($data);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
