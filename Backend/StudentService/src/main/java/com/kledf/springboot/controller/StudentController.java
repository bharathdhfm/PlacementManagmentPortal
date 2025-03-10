package com.kledf.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.kledf.springboot.model.Job;
import com.kledf.springboot.model.Student;
import com.kledf.springboot.service.StudentService;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.HttpHeaders;


import org.springframework.http.MediaType;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;



@CrossOrigin(origins = "http://localhost:3000")

@RequestMapping("student")
@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Home endpoint for Student
    @GetMapping("/")
    public String studentHome() {
        return "I am Student";
    }

    // Get all students
    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Register a student
    @PostMapping("/register")
    public ResponseEntity<String> registerStudent(@RequestBody Student student) {
        studentService.StudentRegistration(student);
        return ResponseEntity.status(HttpStatus.CREATED).body("Student registered successfully");
    }

    // Login a student
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginStudent(@RequestParam String email, @RequestParam String password) {
        Student student = studentService.CheckStudentLogin(email, password);
        Map<String, Object> response = new HashMap<>();
        if (student != null) {
            response.put("success", true);
            response.put("message", "Login successful!");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Invalid email or password!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // Get all available jobs
    @GetMapping("/jobs/all")
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = studentService.getAllJobs();
        if (jobs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // No jobs found
        }
        return ResponseEntity.ok(jobs);
    }

    // Apply for a job
   @PostMapping("/apply")
    public ResponseEntity<Map<String, String>> applyForJob(@RequestParam int studentId, @RequestParam Long jobId) {
        Map<String, String> response = new HashMap<>();

        try {
            // Apply for the job
            boolean isApplied = studentService.applyForJob(studentId, jobId);
            
            if (isApplied) {
                response.put("success", "true");
                response.put("message", "Applied for the job successfully!");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", "false");
                response.put("message", "Failed to apply for the job! You may have already applied.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        } catch (Exception e) {
            response.put("success", "false");
            response.put("message", "Error applying for the job: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Get all applied jobs for a student
    @GetMapping("/appliedJobs")
    public ResponseEntity<List<Job>> getAppliedJobs(@RequestParam int studentId) {
        List<Job> appliedJobs = studentService.getAppliedJobs(studentId);
        if (appliedJobs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // No applied jobs found
        }
        return ResponseEntity.ok(appliedJobs);
    }
    
    
 // View a student's profile
 // In StudentController.java
 // In StudentController.java
    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> viewProfile(@RequestParam String email) {
        Student student = studentService.findByEmail(email);
        Map<String, Object> response = new HashMap<>();
        if (student != null) {
            response.put("success", true);
            // Use relative path for the image
            String profilePhotoUrl = "http://localhost:2003/uploads/" + student.getProfilePhotoUrl();
            response.put("profilePhotoUrl", "http://localhost:2003/uploads/" + student.getProfilePhotoUrl());



            response.put("profile", student);
            response.put("profilePhotoUrl", profilePhotoUrl);  // Correct the file path here
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Student not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping("/{email}/uploadProfilePhoto")
    public ResponseEntity<String> uploadProfilePhoto(@PathVariable String email,
                                                     @RequestParam("file") MultipartFile file) {
        try {
            String photoUrl = studentService.saveProfilePhoto(email, file);
            return ResponseEntity.ok("Profile photo uploaded successfully: " + photoUrl);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading photo: " + e.getMessage());
        }
    }

    @GetMapping("/{email}/profilePhoto")
    public ResponseEntity<byte[]> getProfilePhoto(@PathVariable String email) {
        Student student = studentService.findByEmail(email);
        if (student == null || student.getProfilePhotoUrl() == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            Path filePath = Paths.get("uploads").resolve(student.getProfilePhotoUrl());
            byte[] photo = Files.readAllBytes(filePath);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // Set appropriate MIME type
            return new ResponseEntity<>(photo, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    
    @GetMapping("/{email}")
    public ResponseEntity<Student> getStudentDetails(@PathVariable String email) {
        Student student = studentService.findByEmail(email);
        if (student == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(student);
    }
    
    @PostMapping("/uploadResume/{email}")
    public ResponseEntity<String> uploadResume(@PathVariable String email, @RequestParam("file") MultipartFile file) {
        try {
            String resumeUrl = studentService.saveResume(email, file);
            return ResponseEntity.ok("Resume uploaded successfully. File URL: " + resumeUrl);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload resume: " + e.getMessage());
        }
    }

    @GetMapping("/downloadResume/{email}")
    public ResponseEntity<Resource> downloadResume(@PathVariable String email) {
        Student student = studentService.findByEmail(email);
        if (student == null || student.getResumeUrl() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if no resume
        }

        // Get the resume file path
        Path resumePath = Paths.get("uploads/resumes/" + student.getResumeUrl());
        if (!Files.exists(resumePath)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if file not found
        }

        try {
            // Create a Resource from the file and return it
            Resource resource = new UrlResource(resumePath.toUri());
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + student.getResumeUrl() + "\"")
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return 500 if error occurs
        }
    }

    
    





}
