package by.gsu.eventfinder.service;

import by.gsu.eventfinder.dto.request.friendship.FriendshipRequest;
import by.gsu.eventfinder.dto.response.FriendshipResponse;
import by.gsu.eventfinder.dto.response.UserProfileResponse;
import by.gsu.eventfinder.exeption.BusinessException;
import by.gsu.eventfinder.exeption.ResourceNotFoundException;
import by.gsu.eventfinder.exeption.UnauthorizedException;
import by.gsu.eventfinder.model.Friendship;
import by.gsu.eventfinder.model.FriendshipStatus;
import by.gsu.eventfinder.model.User;
import by.gsu.eventfinder.repository.FriendshipRepository;
import by.gsu.eventfinder.repository.UserRepository;
import by.gsu.eventfinder.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendshipService {
    private final FriendshipRepository friendshipRepo;
    private final UserRepository userRepo;
    private final ModelMapper modelMapper;

    @Transactional
    public FriendshipResponse sendRequest(FriendshipRequest request) {
        UserPrincipal currentUser = getCurrentUser();
        User receiver = userRepo.findById(request.getReceiverId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getReceiverId()));

        validateFriendshipRequest(currentUser.getId(), receiver.getId());

        Friendship friendship = new Friendship();
        friendship.setRequester(userRepo.getReferenceById(currentUser.getId()));
        friendship.setReceiver(receiver);
        friendship.setStatus(FriendshipStatus.PENDING);

        return modelMapper.map(friendshipRepo.save(friendship), FriendshipResponse.class);
    }

    @Transactional(readOnly = true) // <-- Добавлено здесь для read-only операций
    private void validateFriendshipRequest(Long requesterId, Long receiverId) {
        if (requesterId.equals(receiverId)) {
            throw new BusinessException("Cannot send friend request to yourself");
        }

        if (friendshipRepo.existsByRequesterIdAndReceiverId(requesterId, receiverId)) {
            throw new BusinessException("Friend request already exists");
        }
    }

    @Transactional(readOnly = true)
    public List<FriendshipResponse> getIncomingRequests() {
        UserPrincipal user = getCurrentUser();
        return friendshipRepo.findByReceiverIdAndStatus(user.getId(), FriendshipStatus.PENDING).stream()
                .map(f -> modelMapper.map(f, FriendshipResponse.class))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<FriendshipResponse> getOutgoingRequests() {
        UserPrincipal user = getCurrentUser();
        return friendshipRepo.findByRequesterIdAndStatus(user.getId(), FriendshipStatus.PENDING).stream()
                .map(f -> modelMapper.map(f, FriendshipResponse.class))
                .toList();
    }

    @Transactional
    public FriendshipResponse updateStatus(Long friendshipId, FriendshipStatus status) {
        Friendship friendship = friendshipRepo.findById(friendshipId)
                .orElseThrow(() -> new ResourceNotFoundException("Friendship", "id", friendshipId));

        if (!friendship.getReceiver().getId().equals(getCurrentUser().getId())) {
            throw new UnauthorizedException("You can't update this friendship request");
        }

        friendship.setStatus(status);
        friendship.setUpdatedAt(LocalDateTime.now());
        return modelMapper.map(friendshipRepo.save(friendship), FriendshipResponse.class);
    }

    @Transactional(readOnly = true)
    public List<UserProfileResponse> getFriends() {
        UserPrincipal user = getCurrentUser();
        List<Friendship> friendships = friendshipRepo.findByRequesterIdOrReceiverIdAndStatus(
                user.getId(), user.getId(), FriendshipStatus.ACCEPTED
        );

        return friendships.stream()
                .map(f -> f.getRequester().getId().equals(user.getId())
                        ? modelMapper.map(f.getReceiver(), UserProfileResponse.class)
                        : modelMapper.map(f.getRequester(), UserProfileResponse.class))
                .toList();
    }


    private UserPrincipal getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("User not authenticated");
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof UserPrincipal) {
            return (UserPrincipal) principal;
        } else {
            throw new UnauthorizedException("Invalid authentication principal");
        }
    }

}