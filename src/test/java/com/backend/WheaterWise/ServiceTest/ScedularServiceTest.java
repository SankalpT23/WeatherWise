package com.backend.WheaterWise.ServiceTest;

import com.backend.WheaterWise.dto.responses.InsightResponse;
import com.backend.WheaterWise.model.User;
import com.backend.WheaterWise.model.UserPreference;
import com.backend.WheaterWise.repository.PreferenceRepository;
import com.backend.WheaterWise.repository.UserRepository;
import com.backend.WheaterWise.service.EmailService;
import com.backend.WheaterWise.service.SchedulerService;
import com.backend.WheaterWise.service.WeatherService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ScedularServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private PreferenceRepository preferenceRepository;

    @Mock
    private WeatherService weatherService;

    @InjectMocks
    private SchedulerService schedulerService;

    @Mock
    private EmailService emailService;

    @Test
    void schedulerShouldCallEmailForEnabledUsers() {

        User user = new User();
        user.setEmail("test@test.com");


        UserPreference pref = new UserPreference();
        pref.setAlertsEnabled(true);
        pref.setDefaultCity("Hyderabad");
        pref.setUser(user);
        user.setUserPreference(pref);

        InsightResponse mockInsight = new InsightResponse();
        mockInsight.setCity("Hyderabad");
        mockInsight.setTemperature(35);
        mockInsight.setCondition("Sunny");
        mockInsight.setAiInsight("Stay hydrated");

//        when(userRepository.findAll()).thenReturn(List.of(user));
        when(preferenceRepository.findByAlertsEnabled(true)).thenReturn(List.of(pref));
        when(weatherService.getInsight("Hyderabad")).thenReturn(mockInsight);

        schedulerService.taskWithCron();

        verify(emailService, times(1))
                .sendBriefing(eq("test@test.com"), any(InsightResponse.class));
    }
}
