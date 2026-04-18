package com.backend.WheaterWise.service;

import com.backend.WheaterWise.dto.requests.PreferenceRequest;
import com.backend.WheaterWise.dto.responses.PreferenceResponse;
import com.backend.WheaterWise.model.User;
import com.backend.WheaterWise.model.UserPreference;
import com.backend.WheaterWise.repository.PreferenceRepository;
import com.backend.WheaterWise.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PreferenceService {

    @Autowired
    private PreferenceRepository preferenceRepository;

    @Autowired
    private UserRepository userRepository;

    private User getAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = "";
        if (principal instanceof org.springframework.security.core.userdetails.UserDetails) {
            email = ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }
        return userRepository.findByEmail(email);
    }

    public PreferenceResponse savePreference(PreferenceRequest preferenceRequest) {

        User user = getAuthenticatedUser();
        UserPreference userPreference = preferenceRepository.findByUser(user).orElse(new UserPreference());
        userPreference.setUser(user);
        userPreference.setTempUnit(preferenceRequest.getTempUnit());
        userPreference.setCity(preferenceRequest.getCity());
        userPreference.setAlertsEnabled(preferenceRequest.isAlertsEnabled());

        UserPreference save = preferenceRepository.save(userPreference);

        return PreferenceResponse.builder()
                .id(save.getId())
                .tempUnit(save.getTempUnit())
                .city(save.getCity())
                .alertsEnabled(save.isAlertsEnabled())
                .build();

    }

    public PreferenceResponse updatePreference(PreferenceRequest preferenceRequest) {
        User user = getAuthenticatedUser();
        UserPreference preference = preferenceRepository.findByUser(user).orElse(new UserPreference());
        preference.setUser(user);
        preference.setCity(preferenceRequest.getCity());
        preference.setTempUnit(preferenceRequest.getTempUnit());
        preference.setAlertsEnabled(preferenceRequest.isAlertsEnabled());

        UserPreference save = preferenceRepository.save(preference);

        return PreferenceResponse.builder()
                .tempUnit(save.getTempUnit())
                .city(save.getCity())
                .alertsEnabled(save.isAlertsEnabled())
                .build();
    }

    public PreferenceResponse getPreference() {
        User user = getAuthenticatedUser();
        UserPreference preference = preferenceRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Preference Not Found"));

        return PreferenceResponse.builder()
                .tempUnit(preference.getTempUnit())
                .city(preference.getCity())
                .alertsEnabled(preference.isAlertsEnabled())
                .build();
    }
}
