package com.backend.WheaterWise.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PreferenceResponse {
    private Long id;
    private String city;
    private boolean alertsEnabled;
    private String tempUnit;
}
