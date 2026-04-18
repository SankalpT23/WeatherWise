package com.backend.WheaterWise.service;

import com.backend.WheaterWise.dto.responses.InsightResponse;
import com.backend.WheaterWise.model.User;
import com.backend.WheaterWise.model.UserPreference;
import com.backend.WheaterWise.repository.PreferenceRepository;
import com.backend.WheaterWise.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchedulerService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PreferenceRepository preferenceRepository;

    @Autowired
    private WeatherService weatherService;

    @Autowired
    private EmailService emailService;

    @Scheduled(cron = "${weather.daily.briefing.cron}")
    public void taskWithCron(){
        List<UserPreference> users = preferenceRepository.findByAlertsEnabled(true);

        for (UserPreference user : users) {
            try {
                User user1 = user.getUser();
                String city = user.getCity();
                if (city == null || city.isBlank()) continue;
                InsightResponse insight = weatherService.getInsight(city);

                emailService.sendBriefing(user1.getEmail(), insight);
            }catch (Exception e){
                System.out.println("Failed to process email for user: " + user.getUser().getEmail());
            }
        }
    }
}
