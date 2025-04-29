package org.example.rezerwacje;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    //Klasa obsługująca wysyłanie maili do użytkowników z messageContent
    public void sendConfirmationEmail(String toEmail, String messageContent) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Potwierdzenie rezerwacji miejsc w teatrze");
        message.setText(messageContent);
        mailSender.send(message);
    }
}


