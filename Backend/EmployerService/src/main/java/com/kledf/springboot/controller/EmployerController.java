package com.kledf.springboot.controller;

import com.kledf.springboot.model.Job;
import com.kledf.springboot.model.Employer;
import com.kledf.springboot.service.EmployerService;
import com.kledf.springboot.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")  // Allow requests from React frontend

@RestController
@RequestMapping("/employer")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    @Autowired
    private JobService jobService;
    
    

    // Employer login
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginEmployer(@RequestParam("email") String email, @RequestParam("password") String password) {
        Employer employer = employerService.checkEmployeeLogin(email, password);
        Map<String, Object> response = new HashMap<>();
        
        if (employer != null) {
            response.put("success", true);
            response.put("message", "Login successful!");
            response.put("employer", employer);  // Include the employer object if needed
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Invalid email or password!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // Post a job
    @PostMapping("/job")
    public ResponseEntity<Object> postJob(@RequestParam("email") String email, @RequestBody Job job, @RequestParam(required = false) String adminUsername) {
        try {
            employerService.postJob(email, job, adminUsername);
            return ResponseEntity.ok(new ResponseMessage("Job posted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error posting job: " + e.getMessage());
        }
    }

    // Get jobs by employer
    @GetMapping("/jobs")
    public ResponseEntity<Object> getJobsByEmployer(@RequestParam("email") String email) {
        List<Job> jobs = employerService.viewJobsByEmployee(email);
        return jobs.isEmpty() ? 
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("No jobs found for employer") : 
            ResponseEntity.ok(jobs);
    }
 // Get all jobs
    @GetMapping("/jobs/all")
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = employerService.getAllJobs();  // Method to get all jobs
        if (jobs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Proper response for empty list
        }
        return ResponseEntity.ok(jobs);
    }
   



    // Update job
    @PutMapping("/job/{jobId}")
    public ResponseEntity<Object> updateJob(@PathVariable("jobId") Long jobId, @RequestParam("email") String email, @RequestBody Job updatedJob) {
        try {
            employerService.updateJob(email, updatedJob);
            return ResponseEntity.ok(new ResponseMessage("Job updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Delete job
    @DeleteMapping("/job/{jobId}")
    public ResponseEntity<Object> deleteJob(@RequestParam("email") String email, @PathVariable("jobId") Long jobId) {
        employerService.deleteJob(email, jobId);
        return ResponseEntity.ok(new ResponseMessage("Job deleted successfully"));
    }
}

class ResponseMessage {
    private String message;

    public ResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
