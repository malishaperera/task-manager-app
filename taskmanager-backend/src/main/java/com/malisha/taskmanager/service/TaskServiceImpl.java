package com.malisha.taskmanager.service;

import com.malisha.taskmanager.dto.TaskDTO;
import com.malisha.taskmanager.entity.Task;
import com.malisha.taskmanager.exception.TaskNotFoundException;
import com.malisha.taskmanager.repository.TaskRepository;
import com.malisha.taskmanager.utill.Mapping;
import lombok.RequiredArgsConstructor;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    private final Mapping mapping;


    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = mapping.convertToTask(taskDTO);
        task.setCreatedAt(LocalDateTime.now());  // auto-set creation time
        Task savedTask = taskRepository.save(task);
        return mapping.convertToTaskDTO(savedTask);
    }

    @Override
    public void updateTask(TaskDTO taskDTO, Long id) {
        System.out.println("Updating task with id: " + id + " and data: " + taskDTO);
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

        existingTask.setTitle(taskDTO.getTitle());
        existingTask.setDescription(taskDTO.getDescription());
        existingTask.setStatus(taskDTO.getStatus());

        taskRepository.save(existingTask);
    }

    @Override
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }

    @Override
    public TaskDTO getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

        return mapping.convertToTaskDTO(task);
    }

    @Override
    public List<TaskDTO> getAllTasks() {

        List<Task> tasks = taskRepository.findAll();
        System.out.println("Retrieved " + tasks+ " tasks from the database.");
        return mapping.convertToTaskDTOList(tasks);
    }
}
