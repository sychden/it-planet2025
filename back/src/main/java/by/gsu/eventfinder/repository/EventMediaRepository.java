package by.gsu.eventfinder.repository;

import by.gsu.eventfinder.model.EventMedia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface EventMediaRepository extends JpaRepository<EventMedia,Long> {
    List<EventMedia> findByEventId(Long eventId);
}
