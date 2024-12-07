package com.kledf.springboot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("faculty")
@RestController
public class FacultyController {
	@GetMapping("/")
	public String FacultyHome()
	{
		return "i am Faculty";
	}
}
