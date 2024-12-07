package com.kledf.springboot.repository;

import com.kledf.springboot.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployerRepository extends JpaRepository<Employer, Long> {
    Employer findByEmail(String email);

    @Query("SELECT e FROM Employer e WHERE e.email = ?1 AND e.password = ?2")
    Employer checkEmployeeLogin(String email, String password);
}
	