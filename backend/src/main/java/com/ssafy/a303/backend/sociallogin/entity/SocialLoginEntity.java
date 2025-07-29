package com.ssafy.a303.backend.sociallogin.entity;

import com.ssafy.a303.backend.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "social_login_tb")
public class SocialLoginEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long loginId;

    @Enumerated(EnumType.STRING)
    private Provider provider;

    private long socialUid;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
