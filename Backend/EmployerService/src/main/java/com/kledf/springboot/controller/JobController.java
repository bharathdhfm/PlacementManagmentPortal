package com.kledf.springboot.controller;

import com.kledf.springboot.model.Job;
import com.kledf.springboot.service.EmployerService;
import com.kledf.springboot.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("job")
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private EmployerService employerService;

    // Post a job
    @PostMapping("/post")
    public void postJob(@RequestParam String email, @RequestBody Job job, @RequestParam String adminUsername) {
        employerService.postJob(email, job, adminUsername); // Pass admin username
    }

    // Get jobs by employer
    @GetMapping("/byEmployer")
    public List<Job> getJobsByEmployer(@RequestParam String email) {
        return employerService.viewJobsByEmployee(email);
    }

    // Update job
    @PutMapping("/{jobId}")
    public void updateJob(@RequestParam String email, @PathVariable Long jobId, @RequestBody Job job) {
        job.setId(jobId);
        employerService.updateJob(email, job);
    }

    // Delete job
    @DeleteMapping("/{jobId}")
    public void deleteJob(@RequestParam String email, @PathVariable Long jobId) {
        employerService.deleteJob(email, jobId);
    }
}
