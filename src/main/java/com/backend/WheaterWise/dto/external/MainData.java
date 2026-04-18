package com.backend.WheaterWise.dto.external;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MainData {
    private double temp;
    @JsonProperty("feels_like")
    private double feels_like;
    private double humidity;
    private double pressure;
    @JsonProperty("temp_min")
    private double temp_min;
    @JsonProperty("temp_max")
    private double temp_max;
}
