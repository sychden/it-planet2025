package by.gsu.eventfinder.repository;

import by.gsu.eventfinder.model.OrganizationDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrganizationDocumentRepository extends JpaRepository<OrganizationDocument,Long> {
    List<OrganizationDocument> findByOrganizationId(Long organizationId);
}
