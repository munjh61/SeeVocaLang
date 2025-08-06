package com.ssafy.a303.backend.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.UUID;

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
    public UserEntity(String loginId, String password, String nickname, boolean socialUser, LocalDate birthday) {
        this.loginId = loginId;
        this.password = password;
        this.nickname = nickname;
        this.socialUser = socialUser;
        this.birthday = birthday;
        this.totalDays = 0;
        this.streakDays = 0;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public void updateEmail(String email) {
        this.email = email;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public boolean checkPasswordMatch(String rawPassword, PasswordEncoder passwordEncoder) {
        return passwordEncoder.matches(rawPassword, this.password);
    }

    public void softDelete() {
        this.nickname = "deleted_" + UUID.randomUUID();  // 중복 방지용 유니크한 닉네임
        this.loginId = null;
        this.email = null;
        this.password = null;
        this.profileImage = null;
        this.birthday = null;
        this.isDeleted = true;
    }

}
