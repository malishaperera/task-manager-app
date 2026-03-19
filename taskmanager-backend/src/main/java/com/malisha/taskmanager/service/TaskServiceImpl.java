package com.malisha.taskmanager.service;

import com.malisha.taskmanager.dto.TaskDTO;
import com.malisha.taskmanager.repository.TaskRepository;
import com.malisha.taskmanager.utill.Mapping;
import lombok.RequiredArgsConstructor;


import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    private final Mapping mapping;


    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        return null;
    }

    @Override
    public void updateTask(TaskDTO taskDTO, Long id) {

    }

    @Override
    public void deleteTask(Long id) {

    }

    @Override
    public TaskDTO getTaskById(Long id) {
        return null;
    }

    @Override
    public List<TaskDTO> getAllTasks() {
        return null;
    }
}
