package by.gsu.eventfinder.service;

import by.gsu.eventfinder.dto.request.participation.ParticipationRequest;
import by.gsu.eventfinder.dto.response.ParticipationResponse;
import by.gsu.eventfinder.exeption.BusinessException;
import by.gsu.eventfinder.exeption.ResourceNotFoundException;
import by.gsu.eventfinder.exeption.UnauthorizedException;
import by.gsu.eventfinder.model.Event;
import by.gsu.eventfinder.model.EventParticipation;
import by.gsu.eventfinder.model.ParticipationStatus;
import by.gsu.eventfinder.repository.EventParticipationRepository;
import by.gsu.eventfinder.repository.EventRepository;
import by.gsu.eventfinder.repository.UserRepository;
import by.gsu.eventfinder.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParticipationService {
    private final EventParticipationRepository participationRepo;
    private final EventRepository eventRepo;
    private final UserRepository userRepo;
    private final ModelMapper modelMapper;

    @Transactional
    public ParticipationResponse register(ParticipationRequest request) {
        UserPrincipal user = getCurrentUser();
        Event event = eventRepo.findById(request.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", request.getEventId()));

        checkParticipationLimit(event);

        EventParticipation participation = new EventParticipation();
        participation.setParticipant(userRepo.findById(user.getId()).orElseThrow());
        participation.setEvent(event);
        participation.setStatus(ParticipationStatus.REGISTERED);

        return modelMapper.map(participationRepo.save(participation), ParticipationResponse.class);
    }

    private void checkParticipationLimit(Event event) {
        if (event.getParticipantLimit() != null) {
            long count = participationRepo.countByEventIdAndStatus(
                    event.getId(), ParticipationStatus.REGISTERED
            );
            if (count >= event.getParticipantLimit()) {
                throw new BusinessException("Event participation limit reached");
            }
        }
    }

    @Transactional(readOnly = true)
    public List<ParticipationResponse> getByEvent(Long eventId) {
        return participationRepo.findByEventId(eventId).stream()
                .map(p -> modelMapper.map(p, ParticipationResponse.class))
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
            throw new UnauthorizedException("Invalid user principal type");
        }
    }

    @Transactional
    public void cancelParticipation(Long participationId) {
        EventParticipation participation = participationRepo.findById(participationId)
                .orElseThrow(() -> new ResourceNotFoundException("Participation", "id", participationId));

        UserPrincipal currentUser = getCurrentUser();

        // Явная проверка прав
        if (!participation.getParticipant().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You can't cancel this participation");
        }

        participationRepo.delete(participation);
    }

}