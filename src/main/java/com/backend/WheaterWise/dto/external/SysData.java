package com.backend.WheaterWise.dto.external;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SysData {
    private String country;
    private long sunrise;
    private long sunset;
}
