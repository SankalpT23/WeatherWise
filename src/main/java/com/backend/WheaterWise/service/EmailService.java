package com.backend.WheaterWise.service;

import com.backend.WheaterWise.dto.responses.InsightResponse;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void sendBriefing(String email, InsightResponse insight) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email is null or empty");
        }
        try {
            String subject = buildSubject(insight);
            String body = buildBody(insight);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(body, true);

            mailSender.send(mimeMessage);
        }catch (Exception e){
            throw new RuntimeException("Mail cannot be sent ",e);
        }
    }


    private String buildSubject(InsightResponse insight) {
        return "WeatherWise 🌤️ | " + insight.getCity() + " Daily Brief";
    }

    private String buildBody(InsightResponse insight) {

        return "<html>" +
                "<body style='font-family: Arial, sans-serif;'>" +

                "<h2>Good Morning! ☀️</h2>" +

                "<p><b>City:</b> " + insight.getCity() + "</p>" +
                "<p><b>Temperature:</b> " + insight.getTemperature() + "°C</p>" +
                "<p><b>Condition:</b> " + insight.getCondition() + "</p>" +

                "<hr/>" +

                "<h3>🔍 Insight</h3>" +
                "<p>" + insight.getAiInsight() + "</p>" +

                "<br/>" +

                "<p>Stay safe and have a great day! 🌈</p>" +

                "</body>" +
                "</html>";
    }
}
