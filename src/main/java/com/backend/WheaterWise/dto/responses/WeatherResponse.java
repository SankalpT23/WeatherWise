package com.backend.WheaterWise.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WeatherResponse implements Serializable { // For Storing in Redis Convert Object in Bytes -> Serializable    private String city;
    private String city;
    private String country;
    private double temperature;
    private double feelsLike;
    private double humidity;
    private double pressure;
    private String condition;
    private String description;
    private double windSpeed;
    private int visibility;
}
