package com.malisha.taskmanager.utill;

import com.malisha.taskmanager.dto.TaskDTO;
import com.malisha.taskmanager.entity.Task;
import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.util.List;

@Component
public class Mapping {

    @Autowired
    private ModelMapper modelMapper;

    public TaskDTO convertToTaskDTO(Task task) {
        return  modelMapper.map(task, TaskDTO.class);
    }

    public Task convertToTask(TaskDTO taskDTO) {
        return modelMapper.map(taskDTO, Task.class);
    }

    public List<TaskDTO> convertToTaskDTOList(List<Task> tasks) {
        return tasks.stream()
                .map(this::convertToTaskDTO)
                .toList();
    }
}
