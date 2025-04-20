package by.gsu.eventfinder.dto.request.event;

import by.gsu.eventfinder.model.EventFormat;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class EventCreateRequest {
    @NotBlank(message = "Title cannot be empty")
    private String title;

    private String description;

    @Future(message = "Start date must be in the future")
    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @NotNull(message = "Format is required")
    private EventFormat format;

    private String location;
    private String onlineLink;
    private Integer participantLimit;
    private List<Long> categoryIds;
}