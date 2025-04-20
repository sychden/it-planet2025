package by.gsu.eventfinder.repository;

import by.gsu.eventfinder.model.Friendship;
import by.gsu.eventfinder.model.FriendshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship,Long> {
    Optional<Friendship> findByRequesterIdAndReceiverId(Long requesterId, Long receiverId);
    List<Friendship> findByRequesterIdOrReceiverId(Long requesterId, Long receiverId);
    List<Friendship> findByStatus(FriendshipStatus status);

    @Query("SELECT f FROM Friendship f WHERE " +
            "(f.requester.id = :userId OR f.receiver.id = :userId) " +
            "AND f.status = 'ACCEPTED'")
    List<Friendship> findAcceptedFriendships(@Param("userId") Long userId);

    @Query("SELECT f FROM Friendship f WHERE " +
            "f.receiver.id = :userId AND f.status = 'PENDING'")
    List<Friendship> findIncomingRequests(@Param("userId") Long userId);

    List<Friendship> findByReceiverIdAndStatus(Long receiverId, FriendshipStatus status);
    List<Friendship> findByRequesterIdAndStatus(Long requesterId, FriendshipStatus status);
    List<Friendship> findByRequesterIdOrReceiverIdAndStatus(Long userId1, Long userId2, FriendshipStatus status);
    boolean existsByRequesterIdAndReceiverId(Long requesterId, Long receiverId);

    // Или явный JPQL запрос, если не работает
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END " +
            "FROM Friendship f " +
            "WHERE f.requester.id = :requesterId AND f.receiver.id = :receiverId")
    boolean existsRelationship(@Param("requesterId") Long requesterId,
                               @Param("receiverId") Long receiverId);
}
