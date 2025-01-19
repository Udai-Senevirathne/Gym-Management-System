package com.example.TrainerMicroservice.TrainerRepository;

import com.example.TrainerMicroservice.TrainerData.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TrainerRepositry extends JpaRepository<Trainer,Integer> {

    @Query("SELECT t FROM Trainer t WHERE t.trainername = ?1")
    List<Trainer> findTrainerByName(String trainername);

}
