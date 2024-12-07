package com.kledf.springboot.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kledf.springboot.model.Job;
import com.kledf.springboot.model.Student;

public interface StudentService {

    // Method for student registration
  void   StudentRegistration(Student student);

    // Method for checking student login credentials
  public  Student CheckStudentLogin(String email, String password);
    public List<Student> getAllStudents();
    List<Job> getAllJobs();
    
 // Method to apply for a job
   boolean applyForJob(int studentId, Long jobId);

    // Method to get all applied jobs for a specific student
    List<Job> getAppliedJobs(int studentId);
    	
    Student findByEmail(String email);
    String saveProfilePhoto(String email, MultipartFile file) throws IOException;
    
    String saveResume(String email, MultipartFile file) throws IOException;

   
    
}
	