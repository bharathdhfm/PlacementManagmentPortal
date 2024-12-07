package com.kledf.springboot.service;

import com.kledf.springboot.model.Job;
import java.util.List;

public interface JobService {
    void addJob(Job job);                  // Add a new job
    void updateJob(Long jobId, Job job);   // Update an existing job
    void deleteJob(Long jobId);            // Delete a job
    List<Job> getAllJobs();                // Get all jobs
    Job getJobById(Long jobId);            // Get a job by its ID
}
	