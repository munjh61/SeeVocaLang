package com.ssafy.a303.backend.friend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.a303.backend.friend.entity.FriendStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReadFriendResponseDto {
    @JsonProperty("user_id")
    private long userId;
    @JsonProperty("profile_url")
    private String profileImage;
    private String nickname;
}
