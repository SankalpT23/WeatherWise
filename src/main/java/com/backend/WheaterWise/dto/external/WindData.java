package com.backend.WheaterWise.dto.external;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WindData {
    private double speed;
    private double deg;
}
