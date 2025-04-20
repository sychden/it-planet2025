package by.gsu.eventfinder.dto.request.event;

import by.gsu.eventfinder.dto.GeoPosition;
import by.gsu.eventfinder.model.EventFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class EventFilterRequest {
    private String searchQuery;
    private List<Long> categoryIds;
    private EventFormat format;
    private LocalDateTime startDateFrom;
    private LocalDateTime startDateTo;
    private GeoPosition geoFilter;
    private Boolean isPublished;
}
