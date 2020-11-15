package utp.BroszuraProduktowa.service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    JavaMailSender mailSender;

    public void sendEmail(String recipient, String subject, String message, String mailHeader) {
        MimeMessagePreparator preparator = mimeMessage -> {
          mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
          mimeMessage.setFrom(new InternetAddress("broszura.produktowa@gmail.com", mailHeader));
          mimeMessage.setSubject(subject);
          mimeMessage.setText(message, "utf-8", "html");
        };
    
        try {
          mailSender.send(preparator);
        } catch (MailException ex) {
          System.err.println(ex.getMessage());
        }
    }
}
