package com.kledf.springboot.service;

import java.io.IOException; // For handling file I/O exceptions
import java.nio.file.Files; // For creating directories and writing files
import java.nio.file.Path; // For file path representation
import java.nio.file.Paths; // For creating Path objects
import java.util.List; // For working with lists
import java.util.Optional; // For handling optional values

import org.springframework.beans.factory.annotation.Autowired; // For dependency injection
import org.springframework.stereotype.Service; // To define a service class
import org.springframework.web.multipart.MultipartFile; // For handling file uploads

import com.kledf.springboot.model.Job; // Your Job entity class
import com.kledf.springboot.model.Student; // Your Student entity class
import com.kledf.springboot.repository.JobRepository; // Repository for Job operations
import com.kledf.springboot.repository.StudentRepository; // Repository for Student operations


@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JobRepository jobRepository;

    @Override
    public void StudentRegistration(Student student) {
        studentRepository.save(student);
    }

    @Override
    public Student CheckStudentLogin(String email, String password) {
        return studentRepository.checkStudentLogin(email, password);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll(); // Fetch all students from the database
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll(); // Retrieve all jobs from the database
    }
    

    @Override
    public boolean applyForJob(int studentId, Long jobId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        Optional<Job> jobOpt = jobRepository.findById(jobId);

        if (studentOpt.isPresent() && jobOpt.isPresent()) {
            Student student = studentOpt.get();
            Job job = jobOpt.get();

            // Check if the student has already applied for the job
            if (!student.getAppliedJobs().contains(job)) {
                student.getAppliedJobs().add(job);
                studentRepository.save(student);
                return true; // Successfully applied
            }
        }
        return false; // Application failed
    }

    @Override
    public List<Job> getAppliedJobs(int studentId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        return studentOpt.map(Student::getAppliedJobs).orElse(List.of()); // Return applied jobs or empty list
    }
    
    @Override
    public Student findByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
    @Override
    public String saveProfilePhoto(String email, MultipartFile file) throws IOException {
        Student student = studentRepository.findByEmail(email);
        if (student == null) {
            throw new IllegalArgumentException("Student not found!");
        }

        // Validate file type
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !originalFilename.matches(".*\\.(jpg|jpeg|png)$")) {
            throw new IllegalArgumentException("Only JPG, JPEG, and PNG files are allowed.");
        }

        // Define the upload directory
        String uploadDir = "uploads/";
        String fileName = System.currentTimeMillis() + "_" + originalFilename;
        Path uploadPath = Paths.get(uploadDir);

        Files.createDirectories(uploadPath);  // Safely create directories

        Path filePath = uploadPath.resolve(fileName);
        Files.write(filePath, file.getBytes());  // Save file to the uploads directory

        // Save relative path to DB
        String fileUrl = fileName;
        student.setProfilePhotoUrl(fileUrl);
        studentRepository.save(student);

        return fileUrl;
    }
    
    @Override
    public String saveResume(String email, MultipartFile file) throws IOException {
        Student student = studentRepository.findByEmail(email);
        if (student == null) {
            throw new IllegalArgumentException("Student not found!");
        }

        // Validate file type (PDF only)
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !originalFilename.matches(".*\\.pdf$")) {
            throw new IllegalArgumentException("Only PDF files are allowed.");
        }

        // Define the upload directory
        String uploadDir = "uploads/resumes/";  // Store resumes in a separate folder
        String fileName = System.currentTimeMillis() + "_" + originalFilename;
        Path uploadPath = Paths.get(uploadDir);

        Files.createDirectories(uploadPath);  // Safely create directories if they don't exist

        Path filePath = uploadPath.resolve(fileName);
        Files.write(filePath, file.getBytes());  // Save the file to the uploads directory

        // Save the relative path to the DB
        String fileUrl = fileName;
        student.setResumeUrl(fileUrl);
        studentRepository.save(student);

        return fileUrl;
    }




}
