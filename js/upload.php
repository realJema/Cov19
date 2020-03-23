<?php
include("config.php");

$title = $_POST["title"];
$descr = $_POST["descr"];


if ($_FILES["fileToUpload"]["error"] > 0) {
    echo "Return Code: " . $_FILES["fileToUpload"]["error"] . "<br>";
} 
else {
    $filename = $_FILES["fileToUpload"]["name"];
    echo "Upload: " . $_FILES["fileToUpload"]["name"] . "<br>";
    echo "Type: " . $_FILES["fileToUpload"]["type"] . "<br>";
    echo "Size: " . ($_FILES["fileToUpload"]["size"] / 1024) . " kB<br>";
    echo "Temp file: " . $_FILES["fileToUpload"]["tmp_name"] . "<br>";

    // putting file into folder
    if (file_exists("layers/" . $filename)) {
        echo $filename . " already exists. ";
    } else {
        move_uploaded_file($_FILES["fileToUpload"]["tmp_name"],
        "layers/" . $filename);

        // sending file name into database
        $sql = " INSERT INTO `cartes` (`id`, `nom`, `titre`, `description`) VALUES (NULL, '$filename', '$title', '$descr')";
        $result = mysqli_query($connect, $sql); 

        if($result === false){
          // do nothing
          echo("<script>console.log('PHP: sql failed ');</script>");
        }
        else {
          echo("<script>console.log('PHP: sql success');</script>");
        }
        
    }


}
?>