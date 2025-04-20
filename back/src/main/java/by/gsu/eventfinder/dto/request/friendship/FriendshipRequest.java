package by.gsu.eventfinder.dto.request.friendship;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FriendshipRequest {
    @NotNull(message = "Receiver ID cannot be null")
    private Long receiverId;
}