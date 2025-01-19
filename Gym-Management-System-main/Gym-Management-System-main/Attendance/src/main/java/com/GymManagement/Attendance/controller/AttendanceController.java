package com.GymManagement.Attendance.controller;

import com.GymManagement.Attendance.model.Attendance;
import com.GymManagement.Attendance.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin ("http://localhost:3000")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;


    @PostMapping(path = "/add_attendance")
    public Attendance saveAttendance(@RequestBody Attendance attendance) {
        return attendanceService.saveAttendance(attendance);
    }

    @GetMapping(path = "/all_attendance")
    public List<Attendance> getAllAttendance() {
        return attendanceService.getAllAttendances();
    }

    @GetMapping(path = "/search_attendance/")
    public List<Attendance> getAttendanceByMemberId(@RequestParam ("memberId") String memberId) {
        return attendanceService.getAttendancesByMemberId(memberId);
    }

    @PutMapping(path = "/edit_attendance")
    public Attendance updateAttendance(@RequestBody Attendance attendance) {
        return attendanceService.updateAttendance(attendance);
    }

    @DeleteMapping(path = "/delete_attendance/{id}")
    public String deleteAttendance(@PathVariable int id) {

        return attendanceService.deleteAttendance(id);
    }


    @GetMapping (path = "/today/")
    public List<Attendance> getAttendancesByMemberIdAndToday(@RequestParam ("memberId") String memberId) {
        return attendanceService.getAttendancesByMemberIdAndToday(memberId);
    }

}
