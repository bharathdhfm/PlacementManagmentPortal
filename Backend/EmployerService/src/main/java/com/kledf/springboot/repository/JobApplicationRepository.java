/*package com.kledf.springboot.repository;

import com.kledf.springboot.model.Job;
import com.kledf.springboot.model.JobApplication;
import com.kledf.springboot.model.Student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    // Additional queries for job applications can be added here if needed
	JobApplication findByStudentAndJob(Student student, Job job);
}
*/