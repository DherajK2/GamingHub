package com.gaming.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//public class Game extends RuntimeException {
//    public Game(String message) {
//        super(message);
//    }
//}


@Document(collection = "games")
public class Game {

    @Id
    private String id;

    private String name;

    private double price;

    private String description;

    // Constructors
    public Game() {}

    public Game(String name, double price, String description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }

    // Getters and Setters
    public String getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}