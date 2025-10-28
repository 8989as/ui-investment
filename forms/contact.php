<?php
/**
 * IV1 Fund Contact Form Handler
 * Simple contact form processing without external dependencies
 */

// Configuration
$receiving_email_address = 'mahmoud.adel@ui.ventures';
$subject_prefix = 'IV1 Fund Contact Form: ';

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
    $email = isset($_POST['email']) ? trim(strip_tags($_POST['email'])) : '';
    $phone = isset($_POST['phone']) ? trim(strip_tags($_POST['phone'])) : '';
    $message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';
    
    // Basic validation
    $errors = array();
    
    if (empty($name)) {
        $errors[] = 'Name is required';
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Valid email is required';
    }
    
    if (empty($phone)) {
        $errors[] = 'Phone number is required';
    }
    
    if (empty($message)) {
        $errors[] = 'Message is required';
    }
    
    // If no errors, send email
    if (empty($errors)) {
        $subject = $subject_prefix . 'New Contact Form Submission';
        
        $email_body = "New contact form submission from IV1 Fund website:\n\n";
        $email_body .= "Name: " . $name . "\n";
        $email_body .= "Email: " . $email . "\n";
        $email_body .= "Phone: " . $phone . "\n";
        $email_body .= "Message:\n" . $message . "\n\n";
        $email_body .= "Submitted on: " . date('Y-m-d H:i:s') . "\n";
        
        $headers = "From: " . $email . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        // Attempt to send email
        if (mail($receiving_email_address, $subject, $email_body, $headers)) {
            echo 'OK';
        } else {
            echo 'Error: Unable to send email. Please try again later.';
        }
    } else {
        echo 'Error: ' . implode(', ', $errors);
    }
} else {
    echo 'Error: Invalid request method';
}
?>
