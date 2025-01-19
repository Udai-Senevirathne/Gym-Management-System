package com.GymManagement.Attendance.repository;

import com.GymManagement.Attendance.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

    List<Attendance> findAttendancesByMemberId(String memberId);

    List<Attendance> findByMemberIdAndDateAndCheckOutTimeIsNull(String memberId, LocalDate today);

}
