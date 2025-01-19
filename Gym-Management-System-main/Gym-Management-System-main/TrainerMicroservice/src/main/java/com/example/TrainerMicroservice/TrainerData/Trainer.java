package com.example.TrainerMicroservice.TrainerData;

import jakarta.persistence.*;

@Entity
@Table(name = "trainer")
public class Trainer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name ="trainername")
    private String trainername;

    @Column(name = "email")
    private String email;

    @Column(name = "number")
    private String number;

    public Trainer() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTrainerName() {
        return trainername;  // Updated method name
    }

    public void setTrainerName(String trainername) {
        this.trainername = trainername;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}
