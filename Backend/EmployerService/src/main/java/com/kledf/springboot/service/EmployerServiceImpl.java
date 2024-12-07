package com.kledf.springboot.service;

import com.kledf.springboot.model.Employer;
import com.kledf.springboot.model.Job;
import com.kledf.springboot.repository.EmployerRepository;
import com.kledf.springboot.repository.JobRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;


import java.util.List;

@Service
public class EmployerServiceImpl implements EmployerService {

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private JobRepository jobRepository;

    @Override
    public Employer checkEmployeeLogin(String email, String password) {
        return employerRepository.checkEmployeeLogin(email, password);
    }
    
    // view all jobs
    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();  // Retrieve all jobs from the database
    }


    @Override	
    public void postJob(String email, Job job, String adminUsername) {
        Employer employer = employerRepository.findByEmail(email);
        job.setEmployer(employer);
        if (adminUsername != null) {
            job.setPostedBy(adminUsername);  // Admin posting the job
        }
        jobRepository.save(job);
    }

    @Override
    public void deleteJob(String email, Long jobId) {
        Employer employer = employerRepository.findByEmail(email);
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getEmployer().getId().equals(employer.getId())) {
            throw new RuntimeException("Employer is not authorized to delete this job");
        }

        jobRepository.delete(job);  // Delete the job
    }

    @Override
    public void updateJob(String email, Job job) {
        // Fetch the employer by email
        Employer employer = employerRepository.findByEmail(email);
        if (employer == null) {
            throw new RuntimeException("Employer not found with email: " + email);
        }

        // Set employer to the job
        job.setEmployer(employer);

        // Check if the job exists by its ID
        Job existingJob = jobRepository.findById(job.getId()).orElseThrow(() -> 
            new RuntimeException("Job not found with ID: " + job.getId()));

        // Update job properties
        existingJob.setJobTitle(job.getJobTitle());
        existingJob.setJobDescription(job.getJobDescription());
        existingJob.setRequiredSkills(job.getRequiredSkills());
        existingJob.setJobType(job.getJobType());
        existingJob.setLocation(job.getLocation());
        existingJob.setSalaryRange(job.getSalaryRange());
        existingJob.setEmployer(job.getEmployer());

        // Save updated job
        jobRepository.save(existingJob);
    }


    @Override
    public List<Job> viewJobsByEmployee(String email) {
        Employer employer = employerRepository.findByEmail(email);
        return jobRepository.findByEmployerId(employer.getId());
    }
}
