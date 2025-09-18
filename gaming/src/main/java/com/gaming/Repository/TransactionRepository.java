package com.gaming.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.gaming.Model.Transaction;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    // Additional query methods if needed
}