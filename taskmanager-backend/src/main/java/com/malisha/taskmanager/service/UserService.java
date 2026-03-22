package com.malisha.taskmanager.service;

import com.malisha.taskmanager.dto.UserDTO;
import com.malisha.taskmanager.entity.User;

public interface UserService {

    UserDTO findByUsername(String username);

    UserDTO save(UserDTO userDTO);
}