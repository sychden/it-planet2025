package by.gsu.eventfinder.dto.response;

import by.gsu.eventfinder.model.Friendship;
import by.gsu.eventfinder.model.FriendshipStatus;
import lombok.Data;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class FriendshipResponse {
    private Long id;
    private FriendshipStatus status;
    private LocalDateTime created;
    private LocalDateTime updated;
    private UserProfileResponse requester;
    private UserProfileResponse receiver;
}
