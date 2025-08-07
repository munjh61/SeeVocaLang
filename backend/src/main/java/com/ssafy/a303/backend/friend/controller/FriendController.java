package com.ssafy.a303.backend.friend.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.dto.PageResponseDto;
import com.ssafy.a303.backend.common.security.CustomUserDetails;
import com.ssafy.a303.backend.friend.dto.ReadFriendResponseDto;
import com.ssafy.a303.backend.friend.entity.FriendStatus;
import com.ssafy.a303.backend.friend.service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class FriendController {
    private final FriendService friendService;

    @GetMapping("/api/v1/friends")
    public ResponseEntity<PageResponseDto<ReadFriendResponseDto>> getPendingFriends(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                                                    @RequestParam("status") FriendStatus friendStatus) {
        PageResponseDto<ReadFriendResponseDto> pageResponseDto = friendService
                .getPendingFriends(customUserDetails.getUserId(), friendStatus);

        return ResponseEntity.ok(pageResponseDto);
    }

    @PostMapping("/api/v1/friends/{receiverId}")
    public ResponseEntity<BaseResponseDto<Void>> requestFriend(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                               @PathVariable long receiverId) {
        BaseResponseDto<Void> response = friendService.requestFriend(userDetails.getUserId(), receiverId);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/api/v1/friends/{senderId}")
    public ResponseEntity<BaseResponseDto<Void>> requestApproved(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                                 @PathVariable long senderId) {
        BaseResponseDto<Void> response = friendService.updateFriendRequest(senderId, userDetails.getUserId());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/api/v1/friends/{deleteId}")
    public ResponseEntity<BaseResponseDto<Void>> deleteFriend(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                              @PathVariable long deleteId) {
        BaseResponseDto<Void> response = friendService.deleteFriend(deleteId, userDetails.getUserId());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);

    }
}
