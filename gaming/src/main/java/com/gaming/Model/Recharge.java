package com.gaming.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;
import java.util.Date;

@Document(collection = "recharges")
public class Recharge {

    @Id
    private String id;

    private ObjectId memberId;

    private double amount;

    private Date dateTime;

    // Constructors
    public Recharge() {
        this.dateTime = new Date();  // default to now
    }

    public Recharge(ObjectId memberId, double amount) {
        this.memberId = memberId;
        this.amount = amount;
        this.dateTime = new Date();
    }

    // Getters and Setters
    public String getId() { return id; }

    public ObjectId getMemberId() { return memberId; }
    public void setMemberId(ObjectId memberId) { this.memberId = memberId; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public Date getDateTime() { return dateTime; }
    public void setDateTime(Date dateTime) { this.dateTime = dateTime; }
}