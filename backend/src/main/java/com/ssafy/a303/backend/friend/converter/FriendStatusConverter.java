package com.ssafy.a303.backend.friend.converter;

import com.ssafy.a303.backend.friend.entity.FriendStatus;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class FriendStatusConverter implements Converter<String, FriendStatus> {
    @Override
    public FriendStatus convert(String source) {
        return FriendStatus.convert(source);
    }
}
