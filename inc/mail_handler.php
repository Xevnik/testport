<?php
ob_start();
$error = [];
/*
 * Error Checking
 * */

if($_POST) {

    $name = trim(stripslashes($_POST['contactName']));
    $email = trim(stripslashes($_POST['contactEmail']));
    $subject = "New Contact form Submission";
    $contact_message = trim(stripslashes($_POST['contactMessage']));

// Check Name
    if (strlen($name) < 2) {
        $error['name'] = "Please enter your name.";
    }
// Check Email
    if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {
        $error['email'] = "Please enter a valid email address.";
    }
// Check Message
    if (strlen($contact_message) < 15) {
        $error['message'] = "Your message should have at least 15 characters.";
    }
// Subject
    if ($subject == '') {
        $subject = "Contact Form Submission";
    }


//if(strlen($_POST['name']) === 0 || strlen($_POST['subject']) === 0 || strlen($_POST['email']) === 0){
//    $errors[] = 'Forms not filled out';
//}
//
//if(count($errors) > 0){
//    $output = [];
//    $output['success'] = false;
//    $output['message'] = $errors;
//    print(json_encode($output));
//    exit();
//}

    require_once('email_config.php');
    require('../vendor/phpmailer/phpmailer/PHPMailerAutoload.php');
    $mail = new PHPMailer;
    $mail->SMTPDebug = 0;                               // Enable verbose debug output

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication


    $mail->Username = EMAIL_USER;                 // SMTP username
    $mail->Password = EMAIL_PASS;                 // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to
    $options = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    $mail->smtpConnect($options);
    $mail->From = 'kchau.mailserver@gmail.com';//your email sending account
    $mail->FromName = 'Kevin Chau\'s Mail Daemon';//your email sending account name
    $mail->addAddress('kchau.jobs@gmail.com'/*your email address, or the email the sender if you are sending confirmation*/ /*email address user name*/);     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
    $mail->addReplyTo($email/*email address of the person sending the message, so you can reply*/);
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    $mail->isHTML(true);                                  // Set email format to HTML
    $message = "
Sender: {$name}<br>
Subject: {$subject}<br>
Message: {$contact_message}<br>
";
    $mail->Subject = $subject;
    $mail->Body = $message;
    $mail->AltBody = htmlentities($contact_message);

    $debug = ob_get_contents();
    ob_end_clean();

    if(!count($error)) {

        if (!$mail->send()) {
            //error
            echo "Something went wrong. Please try again.";
        } else {
            //message sent
            echo "OK";
        }
    } # end if - no validation error

    else {

        $response = (isset($error['name'])) ? $error['name'] . "<br /> \n" : null;
        $response .= (isset($error['email'])) ? $error['email'] . "<br /> \n" : null;
        $response .= (isset($error['message'])) ? $error['message'] . "<br />" : null;

        echo $response;

    } # end if - there was a validation error
}

