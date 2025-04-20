package by.gsu.eventfinder.repository;

import by.gsu.eventfinder.model.MessageAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageAttachmentRepository extends JpaRepository<MessageAttachment,Long> {
    List<MessageAttachment> findByMessageId(Long messageId);
}
