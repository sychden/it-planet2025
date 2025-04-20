package by.gsu.eventfinder.repository;

import by.gsu.eventfinder.model.EventParticipation;
import by.gsu.eventfinder.model.ParticipationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventParticipationRepository extends JpaRepository<EventParticipation,Long> {
    Optional<EventParticipation> findByParticipantIdAndEventId(Long participantId, Long eventId);
    List<EventParticipation> findByParticipantId(Long participantId);
    List<EventParticipation> findByEventId(Long eventId);
    Long countByEventIdAndStatus(Long eventId, ParticipationStatus status);
}
