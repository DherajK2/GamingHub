package com.gaming.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;
import java.util.Date;

@Document(collection = "transactions")
public class Transaction {

    @Id
    private String id;

    private ObjectId memberId;

    private ObjectId gameId;

    private double amount;

    private Date dateTime;

    // Constructors
    public Transaction() {
        this.dateTime = new Date();
    }

    public Transaction(ObjectId memberId, ObjectId gameId, double amount) {
        this.memberId = memberId;
        this.gameId = gameId;
        this.amount = amount;
        this.dateTime = new Date();
    }

    // Getters and setters
    public String getId() { return id; }

    public ObjectId getMemberId() { return memberId; }
    public void setMemberId(ObjectId memberId) { this.memberId = memberId; }

    public ObjectId getGameId() { return gameId; }
    public void setGameId(ObjectId gameId) { this.gameId = gameId; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public Date getDateTime() { return dateTime; }
    public void setDateTime(Date dateTime) { this.dateTime = dateTime; }
}