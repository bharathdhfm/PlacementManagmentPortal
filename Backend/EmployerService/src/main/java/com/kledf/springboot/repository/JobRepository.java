package com.kledf.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kledf.springboot.model.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByEmployerId(Long employerId);
}
