package by.gsu.eventfinder.controller;

import by.gsu.eventfinder.dto.request.friendship.FriendshipActionRequest;
import by.gsu.eventfinder.dto.request.friendship.FriendshipRequest;
import by.gsu.eventfinder.dto.response.FriendshipResponse;
import by.gsu.eventfinder.dto.response.UserProfileResponse;
import by.gsu.eventfinder.model.FriendshipStatus;
import by.gsu.eventfinder.service.FriendshipService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friends")
@RequiredArgsConstructor
public class FriendshipController {
    private final FriendshipService friendshipService;

    @PostMapping("/requests")
    @PreAuthorize("hasRole('PARTICIPANT')")
    public ResponseEntity<FriendshipResponse> sendRequest(
            @Valid @RequestBody FriendshipRequest request) {
        return ResponseEntity.ok(friendshipService.sendRequest(request));
    }

    @PostMapping("/accept")
    @PreAuthorize("hasRole('PARTICIPANT')")
    public ResponseEntity<FriendshipResponse> accept(
            @Valid @RequestBody FriendshipActionRequest request) {
        return ResponseEntity.ok(friendshipService.updateStatus(
                request.getFriendshipId(), FriendshipStatus.ACCEPTED));
    }

    @GetMapping("/requests/incoming")
    public ResponseEntity<List<FriendshipResponse>> getIncomingRequests() {
        return ResponseEntity.ok(friendshipService.getIncomingRequests());
    }

    @GetMapping("/requests/outgoing")
    public ResponseEntity<List<FriendshipResponse>> getOutgoingRequests() {
        return ResponseEntity.ok(friendshipService.getOutgoingRequests());
    }

    @GetMapping
    public ResponseEntity<List<UserProfileResponse>> getFriends() {
        return ResponseEntity.ok(friendshipService.getFriends());
    }
}