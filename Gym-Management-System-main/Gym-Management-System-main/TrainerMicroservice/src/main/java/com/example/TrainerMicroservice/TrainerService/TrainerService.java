package com.example.TrainerMicroservice.TrainerService;

import com.example.TrainerMicroservice.TrainerData.Trainer;
import com.example.TrainerMicroservice.TrainerRepository.TrainerRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TrainerService {
    @Autowired
    private TrainerRepositry trainerRepositry;

    public List<Trainer> getAllTrainers() {
        return trainerRepositry.findAll();
    }
    public Trainer getTrainerById(int id) {
        Optional<Trainer> optionalTrainer = trainerRepositry.findById(id);
        return optionalTrainer.orElse(null);
    }
    public Trainer createTrainer(Trainer trainer) {
        return trainerRepositry.save(trainer);
    }
    public Trainer updateTrainer(Trainer trainer) {
        return trainerRepositry.save(trainer);
    }
    public String deleteTrainerById(int id) {
        trainerRepositry.deleteById(id);
        return "Delete Trainer Successfully";
    }


}
