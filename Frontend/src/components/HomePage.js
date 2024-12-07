import React from "react";
import "./Homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";

// Import images
import Image1 from "./Images/p.jpeg";
import Image2 from "./Images/klu.jpeg";
import Image3 from "./Images/klu2.jpeg";
import Image4 from "./Images/4.jpeg";

export function Homepage() {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Admin Login Section */}
      <AppBar position="sticky" sx={{ backgroundColor: "#0e6ce6", boxShadow: 3 }}>
        <Toolbar>
          {/* Left-side buttons */}
          <Box sx={{ ml: "auto", display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              onClick={() => scrollToSection("about-us")}
              sx={{ textTransform: "none" }}
            >
              About Us
            </Button>
            <Button
              color="inherit"
              onClick={() => scrollToSection("contact-us")}
              sx={{ textTransform: "none" }}
            >
              Contact Us
            </Button>
          </Box>

          {/* Centered Placement Portal Title */}
          <Typography
            variant="h4"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Placement Portal
          </Typography>

          {/* Admin Login Button */}
          <Box sx={{ ml: "auto" }}>
            <Button
              href="/admin-login"
              variant="outlined"
              color="inherit"
              sx={{
                borderRadius: "20px",
                padding: "10px 20px",
                textTransform: "none",
              }}
            >
              Admin Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Slideshow Section */}
      <div className="slideshow">
        <img src={Image1} alt="Campus view" className="slideshow-image" />
        <img src={Image2} alt="University building" className="slideshow-image" />
        <img src={Image3} alt="Students gathering" className="slideshow-image" />
        <img src={Image4} alt="Career event" className="slideshow-image" />

        {/* Sections on Top of Slideshow */}
        <div className="overlay">
          <div className="student-section col-md-5 mb-3">
            {/* Student Section */}
            <div className="card text-center">
              <div className="card-body">
                <Typography variant="h5" color="primary" className="card-title">
                  Student Section
                </Typography>
                <Typography variant="body2" color="textSecondary" className="card-text">
                  Access job opportunities and track applications.
                </Typography>
                <Box mt={2}>
                  <Button
                    href="/student-login"
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 2 }}
                  >
                    Student Login
                  </Button>
                  <Button
                    href="/student-register"
                    variant="outlined"
                    color="primary"
                  >
                    Student Register
                  </Button>
                </Box>
              </div>
            </div>
          </div>

          <div className="recruiter-section col-md-5 mb-3">
            {/* Recruiter Section */}
            <div className="card text-center">
              <div className="card-body">
                <Typography variant="h5" color="success" className="card-title">
                  Recruiter Section
                </Typography>
                <Typography variant="body2" color="textSecondary" className="card-text">
                  Find and recruit talented students.
                </Typography>
                <Box mt={2}>
                  <Button
                    href="/employer-login"
                    variant="contained"
                    color="success"
                  >
                    Recruiter Login
                  </Button>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div id="about-us" style={{ padding: "50px", backgroundColor: "#f5f5f5" }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1">
          We are committed to providing the best platform for students and recruiters to connect and achieve their goals. Our portal is designed to streamline the placement process and enhance opportunities for everyone.
        </Typography>
      </div>

      {/* Contact Us Section */}
      <div id="contact-us" style={{ padding: "50px", backgroundColor: "#e9ecef" }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">
          For any inquiries, feel free to reach out to us:
          <ul>
            <li>Email: placement@university.com</li>
            <li>Phone: +91-9876543210</li>
          </ul>
        </Typography>
      </div>
    </div>
  );
}
