package com.ssafy.a303.backend.folder.interceptor;

import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import com.ssafy.a303.backend.common.security.CustomUserDetails;
import com.ssafy.a303.backend.folder.entity.FolderEntity;
import com.ssafy.a303.backend.folder.exception.FolderNotAuthorization;
import com.ssafy.a303.backend.folder.service.FolderService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import javax.swing.text.html.Option;
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class FolderAuthCheckInterceptor implements HandlerInterceptor {
    private final FolderService folderService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!request.getMethod().equals("DELETE") && !request.getMethod().equals("PUT")) {
            return true;
        }

        Map<String, String> pathVariables =
                (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);

        long folderId = Long.parseLong(pathVariables.get("folderId"));
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        FolderEntity folder = folderService.getFolderById(folderId);

        if (userDetails.getUserId() != folder.getUser().getUserId() || folder.isDefault())
            throw new FolderNotAuthorization(CommonErrorCode.FORBIDDEN_REQUEST);

        return true;
    }
}
