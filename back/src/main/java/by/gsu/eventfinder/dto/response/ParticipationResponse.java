package by.gsu.eventfinder.dto.response;

import by.gsu.eventfinder.model.ParticipationStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ParticipationResponse {
    private Long id;
    private ParticipationStatus status;
    private LocalDateTime registeredAt;
    private LocalDateTime attendedAt;
    private UserProfileResponse participant;
    private EventResponse event;
}