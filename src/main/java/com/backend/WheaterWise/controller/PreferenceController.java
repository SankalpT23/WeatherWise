package com.backend.WheaterWise.controller;

import com.backend.WheaterWise.dto.requests.PreferenceRequest;
import com.backend.WheaterWise.dto.responses.PreferenceResponse;
import com.backend.WheaterWise.service.PreferenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/p")
public class PreferenceController {

    @Autowired
    private PreferenceService preferenceService;

    @PostMapping
    public ResponseEntity<PreferenceResponse> savePreference(@RequestBody PreferenceRequest preferenceRequest) {
        PreferenceResponse preferenceResponse = preferenceService.savePreference(preferenceRequest);
        return new ResponseEntity<>(preferenceResponse, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<PreferenceResponse> getPreference() {
        PreferenceResponse preferenceResponse = preferenceService.getPreference();
        return new ResponseEntity<>(preferenceResponse, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<PreferenceResponse> updatePreference(@RequestBody PreferenceRequest preferenceRequest) {
        PreferenceResponse preferenceResponse = preferenceService.updatePreference(preferenceRequest);
        return new ResponseEntity<>(preferenceResponse, HttpStatus.OK);
    }
}
