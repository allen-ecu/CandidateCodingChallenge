<?php
require_once 'error_handler.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

//get data
if ((isset($_POST['name'])) && (strlen(trim($_POST['name'])) > 0)) {
	$name = stripslashes(strip_tags($_POST['name']));
} else {$name = 'No name provided';}
if ((isset($_POST['email'])) && (strlen(trim($_POST['email'])) > 0)) {
	$email = stripslashes(strip_tags($_POST['email']));
} else {$email = 'No email provided';}
if ((isset($_POST['phone'])) && (strlen(trim($_POST['phone'])) > 0)) {
	$phone = stripslashes(strip_tags($_POST['phone']));
} else {$phone = 'No phone provided';}
if ((isset($_POST['notes'])) && (strlen(trim($_POST['notes'])) > 0)) {
	$notes= stripslashes(strip_tags($_POST['notes']));
} else {$notes = 'No notes provided';}
ob_start();

//send email
$to = 'dustonlyperth@gmail.com';
$subject = 'Onsite Enquiry Submitted by Clients';
$from = 'system@weiqingmao.com.au';
$headers = 'From: '.$from;
$message = '
Dear Admin,
The user has sent an email to you with these information:
Name: '.$name.'
Email: '.$email.'
Phone: '.$phone.'
Message: '.$notes;

mail($to,$subject,$message,$headers);
$client = $email;
$csub = 'Your email receipt from us';
mail($client,$csub,$message,$headers);

$response = 'Email was sent!';
echo $response;
exit;
?>
