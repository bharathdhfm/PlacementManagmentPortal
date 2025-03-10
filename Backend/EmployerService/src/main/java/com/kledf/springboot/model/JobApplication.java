/*package com.kledf.springboot.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "job_applications")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_email")  // Linking to Student entity
    private Student student;

    @ManyToOne
    @JoinColumn(name = "job_id")  // Linking to Job entity
    private Job job;

    @Column(name = "resume_url")
    private String resumeUrl;

    @Column(name = "status", nullable = false)
    private String status = "pending"; // Default status is pending

    @Column(name = "applied_on")
    @Temporal(TemporalType.TIMESTAMP)
    private Date appliedOn;

    // Constructor
    public JobApplication() {
        this.appliedOn = new Date(); // Set the current timestamp when the application is created
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getAppliedOn() {
        return appliedOn;
    }

    public void setAppliedOn(Date appliedOn) {
        this.appliedOn = appliedOn;
    }
}*/
