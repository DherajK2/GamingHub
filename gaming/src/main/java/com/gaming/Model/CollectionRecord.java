package com.gaming.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "collections")
public class CollectionRecord {

    @Id
    private String id;

    private Date date;

    private double amount;

    public CollectionRecord() {}

    public CollectionRecord(Date date, double amount) {
        this.date = date;
        this.amount = amount;
    }

    // Getters and setters
    public String getId() { return id; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}