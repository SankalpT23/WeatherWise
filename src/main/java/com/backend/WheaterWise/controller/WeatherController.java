package com.backend.WheaterWise.controller;

import com.backend.WheaterWise.dto.responses.InsightResponse;
import com.backend.WheaterWise.dto.responses.WeatherResponse;
import com.backend.WheaterWise.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/weather")
public class WeatherController {
    @Autowired
    private WeatherService weatherService;

    @GetMapping("/current")
    public ResponseEntity<WeatherResponse> getCurrentWeather(@RequestParam String city) {
        WeatherResponse currentWeather = weatherService.getCurrentWeather(city);
        return new ResponseEntity<>(currentWeather,HttpStatus.OK);
    }

    @GetMapping("/insight")
    public ResponseEntity<InsightResponse> getInsight(@RequestParam String city) {
        InsightResponse insight = weatherService.getInsight(city);
        return new ResponseEntity<>(insight,HttpStatus.OK);
    }
}
