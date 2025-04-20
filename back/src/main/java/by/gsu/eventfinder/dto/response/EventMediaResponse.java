package by.gsu.eventfinder.dto.response;

import lombok.Data;

@Data
public class EventMediaResponse {
    private Long id;
    private String type;
    private String url;
    private String caption;
}