package com.backend.WheaterWise.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InsightResponse implements Serializable {
    private String city;
    private double temperature;
    private String condition;
    private String aiInsight;
    private LocalDateTime generatedAt;

}
