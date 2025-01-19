package com.example.TrainerMicroservice.TrainerController;

import com.example.TrainerMicroservice.TrainerData.Trainer;
import com.example.TrainerMicroservice.TrainerService.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin ("http://localhost:3000")
@RestController
    public class TrainerControler {
        @Autowired
        private TrainerService trainerService;

        @GetMapping(path = "/trainers")
        public List<Trainer> getAllTrainers() {
            return trainerService.getAllTrainers();
        }

        @GetMapping(path = "/trainers/{id}")
        public Trainer getTrainer(@PathVariable int id) {
            return trainerService.getTrainerById(id);
        }

        @PostMapping(path = "/trainers")
        public Trainer createTrainer(@RequestBody Trainer trainer) {
            return trainerService.createTrainer(trainer);
        }

        @PutMapping(path = "/trainers/{id}")
        public Trainer updateTrainer(@RequestBody Trainer trainer) {

            return trainerService.updateTrainer(trainer);
        }

        @DeleteMapping(path = "/trainers/{id}")
        public String deleteTrainer(@PathVariable int id) {

            return trainerService.deleteTrainerById(id);
        }

    }


