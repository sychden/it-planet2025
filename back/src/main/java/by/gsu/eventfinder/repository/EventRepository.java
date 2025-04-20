package by.gsu.eventfinder.repository;

import by.gsu.eventfinder.model.Event;
import by.gsu.eventfinder.model.EventFormat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event,Long> {
    List<Event> findByOrganizerId(Long organizerId);
    List<Event> findByStartDateBetween(LocalDateTime start, LocalDateTime end);
    List<Event> findByFormat(EventFormat format);

    @Query("SELECT e FROM Event e JOIN e.categories c WHERE c.id = :categoryId")
    List<Event> findByCategoryId(@Param("categoryId") Long categoryId);

    @Query("SELECT e FROM Event e WHERE " +
            "(:search IS NULL OR e.title LIKE %:search% OR e.description LIKE %:search%) " +
            "AND (:format IS NULL OR e.format = :format) " +
            "AND (e.startDate BETWEEN :start AND :end)")
    Page<Event> searchEvents(@Param("search") String search,
                             @Param("format") EventFormat format,
                             @Param("start") LocalDateTime start,
                             @Param("end") LocalDateTime end,
                             Pageable pageable);
}
