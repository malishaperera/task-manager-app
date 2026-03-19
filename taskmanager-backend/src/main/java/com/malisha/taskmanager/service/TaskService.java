package com.malisha.taskmanager.service;

import com.malisha.taskmanager.dto.TaskDTO;

import java.util.List;

public interface TaskService {
    TaskDTO  createTask(TaskDTO taskDTO);
    void updateTask(TaskDTO taskDTO, Long id);
    void deleteTask(Long id);
    TaskDTO getTaskById(Long id);
    List<TaskDTO> getAllTasks();
}
