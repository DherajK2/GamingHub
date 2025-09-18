package com.gaming.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "members")
public class Member {

    @Id
    private String id;

    private String name;

    private double balance = 0.0;

    @Indexed(unique = true)
    private String phone;

    // Constructors, getters, and setters
    public Member() {}

    public Member(String name, String phone, double balance) {
        this.name = name;
        this.phone = phone;
        this.balance = balance;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getBalance() { return balance; }
    public void setBalance(double balance) { this.balance = balance; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}