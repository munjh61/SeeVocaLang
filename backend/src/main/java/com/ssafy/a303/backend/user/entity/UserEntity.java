package com.ssafy.a303.backend.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "user_tb")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true)
    private String loginId;

    @Column(unique = true, nullable = false)
    private String nickname;
    @Column(unique = true)
    private String email;

    @Column(nullable = true)
    private String password;

    @Column(nullable = false)
    private boolean socialUser;
    private String profileImage;

    @Column(nullable = false, name = "is_deleted")
    private boolean isDeleted = false;

    private LocalDate birthday;

    @Column(nullable = false)
    private int totalDays;
    @Column(nullable = false)
    private int streakDays;

    // 회원가입 생성자
    public UserEntity(String loginId, String password, String nickname, boolean socialUser) {
        this.loginId = loginId;
        this.password = password;
        this.nickname = nickname;
        this.socialUser = socialUser;
        this.totalDays = 0;
        this.streakDays = 0;
    }

    public void softDelete() {
        this.isDeleted = true;
    }
}
