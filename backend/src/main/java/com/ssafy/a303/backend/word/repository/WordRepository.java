package com.ssafy.a303.backend.word.repository;

import com.ssafy.a303.backend.word.entity.WordEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WordRepository extends JpaRepository<WordEntity, Long> {
    Page<WordEntity> findByUserUserIdAndWordIdLessThanOrderByWordIdDesc(long userId, long wordId, Pageable pageable);

    Page<WordEntity> findByUserUserIdOrderByWordIdDesc(long userId, Pageable pageable);

    Optional<WordEntity> findByUserUserIdAndWordId(long userId, long wordId);
}
