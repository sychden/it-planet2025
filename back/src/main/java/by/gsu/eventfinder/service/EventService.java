package by.gsu.eventfinder.service;

import by.gsu.eventfinder.dto.request.event.EventCreateRequest;
import by.gsu.eventfinder.dto.request.event.EventUpdateRequest;
import by.gsu.eventfinder.dto.response.EventResponse;
import by.gsu.eventfinder.exeption.GeoCodingException;
import by.gsu.eventfinder.exeption.ResourceNotFoundException;
import by.gsu.eventfinder.exeption.UnauthorizedException;
import by.gsu.eventfinder.model.Category;
import by.gsu.eventfinder.model.Event;
import by.gsu.eventfinder.model.Organization;
import by.gsu.eventfinder.model.ParticipationStatus;
import by.gsu.eventfinder.repository.CategoryRepository;
import by.gsu.eventfinder.repository.EventParticipationRepository;
import by.gsu.eventfinder.repository.EventRepository;
import by.gsu.eventfinder.repository.OrganizationRepository;
import by.gsu.eventfinder.security.UserPrincipal;
import by.gsu.eventfinder.util.GeoCoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.hibernate.query.sqm.tree.SqmNode.log;
@Slf4j
@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final CategoryRepository categoryRepository;
    private final OrganizationRepository organizationRepository;
    private final EventParticipationRepository participationRepository;
    private final GeoCoder geoCoder;
    private final ModelMapper modelMapper;

    @Transactional
    public EventResponse createEvent(EventCreateRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();

        Organization organizer = organizationRepository.findByUserId(userPrincipal.getId())
                .orElseThrow(() -> new UnauthorizedException("User is not an organizer"));

        Event event = modelMapper.map(request, Event.class);
        event.setOrganizer(organizer);

        if (request.getLocation() != null && !request.getLocation().isBlank()) {
            try {
                GeoCoder.GeoCoordinates coords = geoCoder.getCoordinates(request.getLocation());
                event.setLatitude(coords.getLat());
                event.setLongitude(coords.getLng());
            } catch (GeoCodingException e) {
                event.setLatitude(null);
                event.setLongitude(null);
                log.warn("Geocoding failed for address: {}", request.getLocation());
            }
        }

        List<Category> categories = categoryRepository.findAllById(request.getCategoryIds());
        event.setCategories(categories);

        Event savedEvent = eventRepository.save(event);
        return modelMapper.map(savedEvent, EventResponse.class);
    }

    @Transactional(readOnly = true)
    public EventResponse getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));

        return enhanceEventResponse(event);
    }

    @Transactional(readOnly = true)
    public Page<EventResponse> getAllEvents(int page, int size, String sort) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(sort).ascending());
        return eventRepository.findAll(pageable)
                .map(this::enhanceEventResponse);
    }

    private EventResponse enhanceEventResponse(Event event) {
        EventResponse response = modelMapper.map(event, EventResponse.class);
        response.setParticipantsCount(
                Math.toIntExact(participationRepository.countByEventIdAndStatus(
                        event.getId(), ParticipationStatus.REGISTERED
                ))
        );
        return response;
    }

    @Transactional
    public EventResponse updateEvent(Long id, EventUpdateRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));

        checkEventOwnership(event);

        modelMapper.map(request, event);

        if (request.getCategoryIds() != null) {
            List<Category> categories = categoryRepository.findAllById(request.getCategoryIds());
            event.setCategories(categories);
        }

        Event updatedEvent = eventRepository.save(event);
        return modelMapper.map(updatedEvent, EventResponse.class);
    }

    private void checkEventOwnership(Event event) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();

        if (!event.getOrganizer().getUser().getId().equals(userPrincipal.getId())) {
            throw new UnauthorizedException("You don't have permission to modify this event");
        }
    }

    @Transactional
    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));

        checkEventOwnership(event);
        eventRepository.delete(event);
    }
}