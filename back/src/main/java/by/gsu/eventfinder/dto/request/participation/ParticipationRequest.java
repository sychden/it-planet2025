package by.gsu.eventfinder.dto.request.participation;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ParticipationRequest {
    @NotNull
    private Long eventId;
}

