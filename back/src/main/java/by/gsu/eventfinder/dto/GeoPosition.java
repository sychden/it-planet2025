package by.gsu.eventfinder.dto;

import lombok.Data;

@Data
public class GeoPosition {
    private Double latitude;
    private Double longitude;
    private Double radius;
}