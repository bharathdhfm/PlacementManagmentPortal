package com.kledf.springboot.service;

import java.util.List;

import com.kledf.springboot.model.Employer;
import com.kledf.springboot.model.Job;

public interface EmployerService {
    Employer checkEmployeeLogin(String email, String password);
    void postJob(String email, Job job, String adminUsername);
    void deleteJob(String email, Long jobId);
    void updateJob(String email, Job job);
    List<Job> viewJobsByEmployee(String email);
    List<Job> getAllJobs();


}
	