package com.gaming.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.gaming.Model.Game;

@Repository
public interface GameRepository extends MongoRepository<Game, String> {
    Game findByName(String name);
}