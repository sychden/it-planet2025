package by.gsu.eventfinder.dto.request.friendship;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FriendshipActionRequest {
    @NotNull
    private Long friendshipId;
}