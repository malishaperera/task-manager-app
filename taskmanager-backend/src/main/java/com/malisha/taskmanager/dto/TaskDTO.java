package com.malisha.taskmanager.dto;

import com.malisha.taskmanager.entity.enums.Status;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {
    private Long id;
    @NotBlank(message = "Title is required")
    private String title;
    private String description;
    private Status status;
    private LocalDateTime createdAt;
}
