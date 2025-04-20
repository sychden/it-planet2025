package by.gsu.eventfinder.dto.request.event;

import by.gsu.eventfinder.model.EventFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class EventUpdateRequest {
    private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private EventFormat format;
    private String location;
    private String onlineLink;
    private Integer participantLimit;
    private Boolean isPublished;
    private List<Long> categoryIds;
}