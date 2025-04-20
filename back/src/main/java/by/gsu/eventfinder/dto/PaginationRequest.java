package by.gsu.eventfinder.dto;

import lombok.Data;

@Data
public class PaginationRequest {
    private int page = 0;
    private int size = 10;
    private String sortBy = "startDate";
    private String direction = "ASC";
}