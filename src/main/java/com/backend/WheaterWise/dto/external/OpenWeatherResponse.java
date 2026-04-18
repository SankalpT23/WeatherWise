package com.backend.WheaterWise.dto.external;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpenWeatherResponse {
    private String name;
    private MainData main;
    private List<WeatherData> weather;
    private WindData wind;
    private SysData sys;
    private int visibility;
}
