<?php
include("config.php");
mysqli_query($connect,"SET CHARACTER SET 'utf8'");

$sql = "SELECT * FROM cartes";
$result = mysqli_query($connect, $sql);

if($result === false){
  // do nothing
  echo("<script>console.log('PHP: sql failed');</script>");
}
else {

	while($data = mysqli_fetch_row($result))
	{   

	    echo "<div>";
		echo "<input id=ac-$data[0] name=accordion-1 type=radio>";
		echo "<label for=ac-$data[0] onclick=addGeojson('$data[1]')>$data[2]</label>";
		echo "<article class=ac-small>";
		echo "<p>$data[3]</p>";
		echo "</article>";
	    echo "</div>";

	}
}
?>
