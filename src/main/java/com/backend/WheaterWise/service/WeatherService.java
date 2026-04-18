package com.backend.WheaterWise.service;

import com.backend.WheaterWise.dto.external.OpenWeatherResponse;
import com.backend.WheaterWise.dto.responses.InsightResponse;
import com.backend.WheaterWise.dto.responses.WeatherResponse;
import com.backend.WheaterWise.external.OpenWeatherClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class WeatherService {
    @Autowired
    private OpenWeatherClient openWeatherClient;

    @Autowired
    private AIInsightService aiInsightService;

    @Autowired
    @Lazy
    private WeatherService weatherService;

    @Cacheable(value = "weather",key = "#city.toLowerCase()")
    public WeatherResponse getCurrentWeather(String city) {
        OpenWeatherResponse raw = openWeatherClient.getCurrentWeather(city);

        return WeatherResponse.builder()
                .city(raw.getName())
                .country(raw.getSys().getCountry())
                .temperature(raw.getMain().getTemp())
                .feelsLike(raw.getMain().getFeels_like())
                .humidity(raw.getMain().getHumidity())
                .pressure(raw.getMain().getPressure())
                .condition(raw.getWeather().get(0).getMain())
                .description(raw.getWeather().get(0).getDescription())
                .windSpeed(raw.getWind().getSpeed())
                .visibility(raw.getVisibility())
                .build();
    }

    @CacheEvict(value = "weather",key = "#city.toLowerCase()")
    public void evictWeather(String city) {
        // Handled by Spring AOP Cache interception
    }

    @CacheEvict(value = "weather", allEntries = true)
    public void evictAllCache() {
        // Handled by Spring AOP Cache interception
    }

    @Cacheable(value = "insight",key = "#city.toLowerCase()")
    public InsightResponse getInsight(String city) {
        WeatherResponse weather = weatherService.getCurrentWeather(city);
        String insight = aiInsightService.generateInsight(weather);

        return InsightResponse.builder()
                .city(city)
                .temperature(weather.getTemperature())
                .condition(weather.getCondition())
                .aiInsight(insight)
                .generatedAt(LocalDateTime.now())
                .build();
    }
}
