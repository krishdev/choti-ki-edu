<?php
//error_reporting(E_ALL);
//error_reporting(E_STRICT);
//date_default_timezone_set('America/Toronto');
require_once('class.phpmailer.php');
//require_once($_SERVER['DOCUMENT_ROOT'].'/application/classes/common_config.php');
//include("class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded

$api_split = explode('/',$_SERVER['REQUEST_URI']);
$current_ctrl = ($api_split[1])?$api_split[1]:"";
$pos = strpos($current_ctrl, 'mobileapi');

if($pos === false)
{
require_once($_SERVER['DOCUMENT_ROOT'].'/application/classes/common_config.php');	
}
else
{
	require_once($_SERVER['DOCUMENT_ROOT'].'/application/classes/smtp_config.php');
}

$mail             = new PHPMailer();

//$body             = file_get_contents('contents.html');

$body             = $message;
//$body             = eregi_replace("[\]",'',$body);
//print_r($body);
//echo $attachment;
//exit;
$mail->IsSMTP(TRUE); // telling the class to use SMTP

//$mail->SMTPDebug  = 2;                   
// enables SMTP debug information (for testing)
// 1 = errors and messages
// 2 = messages only

$mail->SMTPAuth   = true;                           // enable SMTP authentication
$mail->SMTPSecure = SMTP_TRANSPORT_LAYER_SECURITY;  // sets the prefix to the server
$mail->Host       = SMTP_HOST;      	            // sets SMTP server HOST name
$mail->Port       = SMTP_PORT;                      // set the SMTP port for the server
$mail->Username   = SMTP_USERNAME;  	           // SMTP username
$mail->Password   = SMTP_PASSWORD;                 // SMTP password

if(COMPANY_CID != 0)
{
	$email_name = ucfirst(COMPANY_APP_NAME);
}
else
{
	$email_name = SITE_NAME;
}

$mail->SetFrom($from, $email_name);

//$mail->SetFrom("admin@ticktoc.net", $email_name);

$mail->AddReplyTo("support@ticktoc.net");

$mail->Subject    = $subject;

$mail->MsgHTML($body);

$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

if(!empty($attachment))
{
	$mail->AddAttachment($attachment);
}

//$mail->AddAddress(SITE_EMAIL, APP_NAME);

$to_list = explode(',',$to);

$between_delay = 75; //max limit of mails send at a slot
$send_count = 1; 
$send_delay = 1; //Delays the program execution for the given number of seconds.

ignore_user_abort(true); // Ignore user aborts and allow the script to run forever
set_time_limit(300); //to prevent the script from dying

foreach($to_list as $row)
{

	if ( ($send_count % $between_delay) == 0 ){
		sleep( $send_delay ); //Delays the program execution for the given number of seconds.
	}
	$address = $row;
	if(!empty($address)) {
		$mail->AddAddress($address, "User");
		$mail->Send();	
		$mail->ClearAddresses(); //clear address
	}
$send_count++;

}


//print_r($mail->ErrorInfo);
//exit;
if(!empty($mail->ErrorInfo)) { 
	Message::error($mail->ErrorInfo);
	if($redirect !='no')
	{	
		$this->request->redirect(URL_BASE.$redirect);
	}
}

//$mail->AddAttachment("images/phpmailer.gif");      // attachment
//$mail->AddAttachment("images/phpmailer_mini.gif"); // attachment

?>
