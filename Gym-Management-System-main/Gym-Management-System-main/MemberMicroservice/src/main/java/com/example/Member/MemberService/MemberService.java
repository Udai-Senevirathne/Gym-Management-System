package com.example.Member.MemberService;

import com.example.Member.Member.Member;
import com.example.Member.MemberRepository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public List<Member> getMembers() {
        return memberRepository.findAll();
    }

    public Member getMember(int id) {
        Optional<Member> member = memberRepository.findById(id);
        return member.orElse(null); // Or handle the case where member is not found
    }

    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        return memberRepository.save(member);
    }

    public void deleteMember(int id) {
        memberRepository.deleteById(id);
    }
}
