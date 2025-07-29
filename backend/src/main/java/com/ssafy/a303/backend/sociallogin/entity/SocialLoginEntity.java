package com.ssafy.a303.backend.sociallogin.entity;

import com.ssafy.a303.backend.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "social_login_tb",
        uniqueConstraints = @UniqueConstraint(columnNames = {"provider", "socialUid"})
)
public class SocialLoginEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long socialLoginId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Provider provider;

    @Column(nullable = false)
    private String socialUid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
