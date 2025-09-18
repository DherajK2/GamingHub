package com.gaming.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.gaming.Model.Member;

@Repository
public interface  MemberRepository extends MongoRepository<Member, String> {
    Member findByPhone(String phone);
}