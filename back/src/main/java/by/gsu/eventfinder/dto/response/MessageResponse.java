package by.gsu.eventfinder.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class MessageResponse {
    private Long id;
    private String content;
    private LocalDateTime sentAt;
    private boolean isRead;
    private UserProfileResponse sender;
    private UserProfileResponse receiver;
    private List<MessageAttachmentResponse> attachments;
}