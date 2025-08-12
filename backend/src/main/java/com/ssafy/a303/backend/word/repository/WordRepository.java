package com.ssafy.a303.backend.word.repository;

import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.word.entity.WordEntity;
import com.ssafy.a303.backend.word.repository.query.WordQueryRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WordRepository extends JpaRepository<WordEntity, Long>, WordQueryRepository {

    Optional<WordEntity> findByNameEnAndUserUserIdAndIsDeletedFalse(String nameEn, Long userId);

    Optional<WordEntity> findByUserUserIdAndWordId(long userId, long wordId);

    boolean existsByNameEnAndUserUserIdAndIsDeletedFalse(String name, long userId);

    boolean existsByWordIdAndUserUserIdAndIsDeletedFalse(long wordId, long userId);

    Optional<WordEntity> findByUserUserIdAndNameEnAndIsDeletedFalse(long userId, String nameEn);

    List<WordEntity> findByUserUserIdAndIsDeletedFalse(Long userId);

    long user(UserEntity user);
}