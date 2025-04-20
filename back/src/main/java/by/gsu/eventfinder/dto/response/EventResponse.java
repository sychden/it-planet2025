package by.gsu.eventfinder.dto.response;

import by.gsu.eventfinder.model.EventFormat;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Setter
@Getter
public class EventResponse {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private EventFormat format;
    private String location;
    private Double latitude;
    private Double longitude;
    private String onlineLink;
    private Integer participantLimit;
    private OrganizationPreviewResponse organizer;
    private List<CategoryResponse> categories;
    private List<EventMediaResponse> media;
    private Integer participantsCount;

    public void setParticipantsCount(Integer count) {
        this.participantsCount = count;
    }
}