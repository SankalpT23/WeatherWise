package com.backend.WheaterWise.dto.external;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeatherData {
    private String main;
    private String description;
    private String icon;
}
