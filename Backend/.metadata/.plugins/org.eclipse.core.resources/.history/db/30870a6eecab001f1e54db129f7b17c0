package com.kledf.springboot.service;

import com.kledf.springboot.model.Job;
import com.kledf.springboot.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Override
    public void addJob(Job job) {
        jobRepository.save(job);  // Save job to the database
    }

    @Override
    public void updateJob(Long jobId, Job job) {
        Job existingJob = jobRepository.findById(jobId).orElseThrow(() -> new IllegalArgumentException("Job not found"));
        existingJob.setJobTitle(job.getJobTitle());
        existingJob.setJobDescription(job.getJobDescription());
        existingJob.setRequiredSkills(job.getRequiredSkills());
        existingJob.setJobType(job.getJobType());
        existingJob.setLocation(job.getLocation());
        existingJob.setSalaryRange(job.getSalaryRange());
        existingJob.setEmployer(job.getEmployer());  // Update employer info
        jobRepository.save(existingJob);
    }

    @Override
    public void deleteJob(Long jobId) {
        jobRepository.deleteById(jobId);  // Delete the job by ID
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();  // Get all jobs
    }

    @Override
    public Job getJobById(Long jobId) {
        return jobRepository.findById(jobId).orElseThrow(() -> new IllegalArgumentException("Job not found"));
    }
}
