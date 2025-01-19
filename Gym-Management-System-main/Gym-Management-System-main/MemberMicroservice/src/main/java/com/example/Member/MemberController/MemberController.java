package com.example.Member.MemberController;

import com.example.Member.Member.Member;
import com.example.Member.MemberRepository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin ("http://localhost:3000")
@RestController
@RequestMapping("/members")
public class MemberController {

    @Autowired
    private MemberRepository memberRepository;

    @PostMapping
    public ResponseEntity<Member> createMember(@RequestBody Member member) {
        Member savedMember = memberRepository.save(member);
        return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Member>> getAllMembers() {
        List<Member> members = memberRepository.findAll();
        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable("id") int id) {
        return memberRepository.findById(id)
                .map(member -> new ResponseEntity<>(member, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable("id") int id, @RequestBody Member memberDetails) {
        return memberRepository.findById(id)
                .map(member -> {
                    if (memberDetails.getMembername() != null) {
                        member.setMembername(memberDetails.getMembername());
                    }
                    if (memberDetails.getAge() != null) {
                        member.setAge(memberDetails.getAge());
                    }
                    if (memberDetails.getPhonenumber() != null) {
                        member.setPhonenumber(memberDetails.getPhonenumber());
                    }
                    if (memberDetails.getEmail() != null) {
                        member.setEmail(memberDetails.getEmail());
                    }
                    if (memberDetails.getMembertype() != null) {
                        member.setMembertype(memberDetails.getMembertype());
                    }

                    Member updatedMember = memberRepository.save(member);
                    return new ResponseEntity<>(updatedMember, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}/assign-trainer")
    public ResponseEntity<Member> assignTrainerToMember(@PathVariable("id") int id, @RequestParam("trainerId") Integer trainerId) {
        return memberRepository.findById(id)
                .map(member -> {
                    if (trainerId != null) {
                        member.setTrainerId(trainerId);
                        Member updatedMember = memberRepository.save(member);
                        return new ResponseEntity<>(updatedMember, HttpStatus.OK);
                    } else {
                        return new ResponseEntity<Member>(HttpStatus.BAD_REQUEST);
                    }
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable("id") int id) {
        return memberRepository.findById(id)
                .map(member -> {
                    memberRepository.deleteById(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
