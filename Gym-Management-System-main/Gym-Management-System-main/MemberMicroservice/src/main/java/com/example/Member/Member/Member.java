package com.example.Member.Member;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name="member")
public class Member {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "membername")
    private String membername;

    @Column(name = "age")
    private String age;

    @Column(name = "phonenumber")
    private String phonenumber;

    @Column(name = "email")
    private String email;

    @Column(name = "membertype")
    private String membertype;

    @Column(name = "trainerassign")
    private Integer trainerId;

}
