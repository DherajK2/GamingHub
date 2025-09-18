package com.gaming.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.gaming.Model.AdminUser;

@Repository
public interface AdminUserRepository extends MongoRepository<AdminUser, String> {
    AdminUser findByUsername(String username);
}
