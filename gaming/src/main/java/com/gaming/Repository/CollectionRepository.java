package com.gaming.Repository;
import com.gaming.Model.CollectionRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionRepository extends MongoRepository<CollectionRecord, String> {
    // Custom queries if needed
}