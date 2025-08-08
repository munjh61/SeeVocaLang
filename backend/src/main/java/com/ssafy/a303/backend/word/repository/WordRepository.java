package com.ssafy.a303.backend.word.repository;

import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.word.entity.WordEntity;
import com.ssafy.a303.backend.word.repository.query.WordQueryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WordRepository extends JpaRepository<WordEntity, Long>, WordQueryRepository {

    Optional<WordEntity> findByUserUserIdAndWordId(long userId, long wordId);

    boolean existsByNameEnAndUserUserId(String name, long userId);

    Optional<WordEntity> findByUserUserIdAndNameEn(long userId, String nameEn);

    List<WordEntity> findByUserUserId(Long userId);

    long user(UserEntity user);
}