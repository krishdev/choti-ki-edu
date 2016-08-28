<?php
require 'PHPMailer/PHPMailerAutoload.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$name =  $request->inputUsername; 
$email_address = $request->inputEmail;
$phone= $request->inputPhone;
$address = $request->inputAddress;
$availableDays = $request ->inputAvail;
$languages = $request ->inputLang;

if(!empty($name) && !empty($email_address) && !empty($message)){


$mail = new PHPMailer;
                               
$mail->SMTPDebug = 4;
$mail->IsMail();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'krishnasinbox@outlook.com';                 // SMTP username
$mail->Password = 'aprilfool20';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to

$mail->setFrom('krishnasinbox@outlook.com', 'Krishna');
 
$mail->addAddress('krishnasinbox@gmail.com', 'Krishna');               // Name is optional

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = $subject.' -- '.$name;
$mail->Body    = "Hi Team,<br>  I am ".$name.", and I would like to join you guys. You can contact me using the below details. <br> Phone Number : ".$phone."<br> Email Id : ".$email_address." Address : ".$address."<br> Languages Known : ".$languages."<br> Available Days : ".$availableDays;
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}
echo 'success';
}
?>
