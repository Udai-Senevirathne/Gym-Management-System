package com.GymManagement.Attendance.service;


import com.GymManagement.Attendance.model.Attendance;
import com.GymManagement.Attendance.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Attendance saveAttendance(Attendance attend) {
        return attendanceRepository.save(attend);
    }

    public List<Attendance> getAllAttendances() {
        return attendanceRepository.findAll();
    }

    public String deleteAttendance(int id) {
        attendanceRepository.deleteById(id);
        return "Successfully "+ id + " deleted";
    }

    public List<Attendance> getAttendancesByMemberId(String memberId) {
        return attendanceRepository.findAttendancesByMemberId(memberId);
    }

    public Attendance updateAttendance(Attendance attend) {
        return attendanceRepository.save(attend);
    }


    public List<Attendance> getAttendancesByMemberIdAndToday(String memberId) {
        LocalDate today = LocalDate.now();
        return attendanceRepository.findByMemberIdAndDateAndCheckOutTimeIsNull(memberId, today);
    }


}
