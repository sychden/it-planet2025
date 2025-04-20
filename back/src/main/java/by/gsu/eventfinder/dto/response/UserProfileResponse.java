package by.gsu.eventfinder.dto.response;

import by.gsu.eventfinder.model.Role;
import lombok.Data;

@Data
public class UserProfileResponse {
    private Long id;
    private String username;
    private String email;
    private Role role;
    private String avatarUrl;
}