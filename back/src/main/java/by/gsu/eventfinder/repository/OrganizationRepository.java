package by.gsu.eventfinder.repository;

import by.gsu.eventfinder.model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrganizationRepository extends JpaRepository<Organization,Long> {


    Optional<Organization> findByUserId(Long userId);

    boolean existsByName(String name);

}
