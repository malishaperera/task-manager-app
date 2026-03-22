package com.malisha.taskmanager.service;

import com.malisha.taskmanager.dto.UserDTO;
import com.malisha.taskmanager.entity.User;
import com.malisha.taskmanager.repository.UserRepository;
import com.malisha.taskmanager.utill.Mapping;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements  UserService {

    private final UserRepository userRepository;

    private final Mapping mapping;

    @Override
    public UserDTO findByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapping.convertToUserDTO(user);
    }

    @Override
    public UserDTO save(UserDTO userDTO) {

        User user = mapping.convertToUser(userDTO);
        User savedUser = userRepository.save(user);

        return mapping.convertToUserDTO(savedUser);
    }
}
