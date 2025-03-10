package com.kledf.springboot.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="student_table")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="student_id")
    private int id;

    @Column(name="student_name", nullable = false, length = 100)
    private String name;

    @Column(name="student_email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name="studnet_password",nullable = false)
   	private String password;
    @Column(name="student_passwordresettoken")
    private String passwordResetToken;
       
    @Column(name="student_phone_number", nullable = false, length = 20)
    private String phoneNumber;

    @Column(name="student_department", nullable = false, length = 50)
    private String department;

    @Column(name="student_program", nullable = false, length = 50)
    private String program;

    @Column(name="student_graduation_status", nullable = false, length = 20)
    private String graduationStatus;

    @Column(name="student_cgpa", nullable = false)
    private double cgpa;

    @Column(name="student_number_of_backlogs", nullable = false)
    private int numberOfBacklogs;

    @Column(name="student_current_location", length = 100)
    private String currentLocation;

    @Column(name="student_preferred_job_location", length = 100)
    private String preferredJobLocation;

    @Column(name="student_skills", length = 255)
    private String skills;

    @Column(name="student_job_status", length = 20)
    private String jobStatus;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "student_id")
    private List<Job> appliedJobs = new ArrayList<>();
    
    @Column(name = "student_profile_photo", length = 500 , nullable = true)
    private String profilePhotoUrl;
    
    @Column(name = "student_resume", length = 500, nullable = true)
    private String resumeUrl;



    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public String getGraduationStatus() {
        return graduationStatus;
    }

    public void setGraduationStatus(String graduationStatus) {
        this.graduationStatus = graduationStatus;
    }

    public double getCgpa() {
        return cgpa;
    }

    public void setCgpa(double cgpa) {
        this.cgpa = cgpa;
    }

    public int getNumberOfBacklogs() {
        return numberOfBacklogs;
    }

    public void setNumberOfBacklogs(int numberOfBacklogs) {
        this.numberOfBacklogs = numberOfBacklogs;
    }

    public String getCurrentLocation() {
        return currentLocation;
    }

    public void setCurrentLocation(String currentLocation) {
        this.currentLocation = currentLocation;
    }

    public String getPreferredJobLocation() {
        return preferredJobLocation;
    }

    public void setPreferredJobLocation(String preferredJobLocation) {
        this.preferredJobLocation = preferredJobLocation;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getJobStatus() {
        return jobStatus;
    }

    public void setJobStatus(String jobStatus) {
        this.jobStatus = jobStatus;
    }

    public List<Job> getAppliedJobs() {
        return appliedJobs;
    }

    public void setAppliedJobs(List<Job> appliedJobs) {
        this.appliedJobs = appliedJobs;
    }
    public String getProfilePhotoUrl() {
        return profilePhotoUrl;
    }	

    public void setProfilePhotoUrl(String profilePhotoUrl) {
        this.profilePhotoUrl = profilePhotoUrl;
    }
    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }
    // Getters and Setters
    public String getPasswordResetToken() {
        return passwordResetToken;
    }

    public void setPasswordResetToken(String passwordResetToken) {
        this.passwordResetToken = passwordResetToken;
    }

}
