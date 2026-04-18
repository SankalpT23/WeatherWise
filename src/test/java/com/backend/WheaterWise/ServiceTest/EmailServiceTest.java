package com.backend.WheaterWise.ServiceTest;

import com.backend.WheaterWise.dto.responses.InsightResponse;
import com.backend.WheaterWise.service.AIInsightService;
import com.backend.WheaterWise.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EmailServiceTest {

    @Mock
    private JavaMailSender javaMailSender;

    @Mock
    private MimeMessage mimeMessage;

    @Mock
    private AIInsightService aiInsightService;

    private EmailService emailService;


    @Test
    void shouldSendEmailSuccessfully() {

        when(javaMailSender.createMimeMessage()).thenReturn(mimeMessage);
        InsightResponse insightResponse = new InsightResponse();
        insightResponse.setCity("Hyderabad");
        insightResponse.setTemperature(35);
        insightResponse.setCondition("Sunny");
        insightResponse.setAiInsight("Stay Hyderabad");


        emailService.sendBriefing("sankalptiwari94255@gmail.com", insightResponse);

        verify(javaMailSender,timeout(1000).times(1)).send(any(MimeMessage.class));
    }
    @Test
    void shouldNotSendWhenEmailIsNull() {
        // edge case — null email pe exception aana chahiye
        InsightResponse insightResponse = new InsightResponse();
        insightResponse.setCity("Hyderabad");
        insightResponse.setTemperature(35);
        insightResponse.setCondition("Sunny");
        insightResponse.setAiInsight("Stay Hyderabad");

        assertThrows(RuntimeException.class,
                () -> emailService.sendBriefing(null, insightResponse ));
    }
}
