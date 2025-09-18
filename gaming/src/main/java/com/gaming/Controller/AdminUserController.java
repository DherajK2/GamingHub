package com.gaming.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.gaming.Model.AdminUser;
import com.gaming.Repository.AdminUserRepository;

@RestController
@RequestMapping("/api/admin_users")
public class AdminUserController {

    @Autowired
    private AdminUserRepository adminUserRepository;

    @GetMapping
    public List<AdminUser> getAllAdminUsers() {
        return adminUserRepository.findAll();
    }

    @PostMapping
    public AdminUser createAdminUser(@RequestBody AdminUser adminUser) {
        return adminUserRepository.save(adminUser);
    }
}
