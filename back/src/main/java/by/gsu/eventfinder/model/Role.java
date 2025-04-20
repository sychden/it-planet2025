package by.gsu.eventfinder.model;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ADMIN, MODERATOR, ORGANIZER, PARTICIPANT;

    @Override
    public String getAuthority() {
        return "ROLE_" + name();
    }
}