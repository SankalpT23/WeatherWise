package com.backend.WheaterWise.controller;

import com.backend.WheaterWise.dto.responses.InsightResponse;
import com.backend.WheaterWise.service.EmailService;
import com.backend.WheaterWise.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class EmailTestController {
    @Autowired
    private EmailService emailService;

    @Autowired
    private WeatherService weatherService;

    @PostMapping("/send")
    public String sendEmail(@RequestParam String email, @RequestParam String city) {
        InsightResponse insight = weatherService.getInsight(city);

        emailService.sendBriefing(email, insight);
        return "Test Mail Sent Successfully to " + email;
    }
}
