// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
    // Theme Toggle
    const themeToggleBtn = document.getElementById("theme-toggle-btn")
    const currentTheme = localStorage.getItem("theme") || "dark"
  
    // Set initial theme
    document.documentElement.setAttribute("data-theme", currentTheme)
  
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"
  
      document.documentElement.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)
    })
  
    // Preloader
    const preloader = document.querySelector(".preloader")
    const progressBar = document.querySelector(".loader-progress-bar")
    const counterElement = document.querySelector(".loader-counter")
  
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 1
      if (progress > 100) progress = 100
  
      progressBar.style.width = `${progress}%`
      counterElement.textContent = `${progress}%`
  
      if (progress === 100) {
        clearInterval(interval)
        setTimeout(() => {
          preloader.classList.add("hidden")
          // Start animations after preloader is hidden
          initAnimations()
        }, 500)
      }
    }, 150)
  
    // Initialize GSAP and plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText)
  
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      multiplier: 1,
      class: "is-inview",
      scrollFromAnywhere: true,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    })
  
    // Register scroll call for skill animation
    scroll.on("call", "animateSkill", (obj) => {
      const el = obj.el
      const progress = el.querySelector(".skill-progress")
      const progressValue = progress.getAttribute("data-progress")
  
      gsap.to(progress, {
        width: `${progressValue}%`,
        duration: 1.5,
        ease: "power2.out",
      })
    })
  
    // Update ScrollTrigger when locomotive scroll updates
    scroll.on("scroll", ScrollTrigger.update)
  
    // Tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
      scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })
  
    // Custom Cursor
    const cursor = document.querySelector(".custom-cursor")
    const cursorFollower = document.querySelector(".custom-cursor-follower")
  
    document.addEventListener("mousemove", (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      })
  
      gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      })
    })
  
    document.addEventListener("mousedown", () => {
      cursor.classList.add("active")
      cursorFollower.classList.add("active")
    })
  
    document.addEventListener("mouseup", () => {
      cursor.classList.remove("active")
      cursorFollower.classList.remove("active")
    })
  
    // Add cursor effects to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, .project-card, .interest-card, .initiative-card",
    )
  
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.classList.add("active")
        cursorFollower.classList.add("active")
      })
  
      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("active")
        cursorFollower.classList.remove("active")
      })
    })
  
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar")
  
    scroll.on("scroll", (args) => {
      if (args.scroll.y > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // Mobile menu toggle
    const menuBtn = document.querySelector(".mobile-menu-btn")
    const menuIcon = document.querySelector(".menu-icon")
    const mobileNav = document.querySelector(".mobile-nav")
  
    menuBtn.addEventListener("click", () => {
      menuIcon.classList.toggle("active")
      mobileNav.classList.toggle("active")
      document.body.classList.toggle("menu-open")
    })
  
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-item")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuIcon.classList.remove("active")
        mobileNav.classList.remove("active")
        document.body.classList.remove("menu-open")
      })
    })
  
    // Initialize animations
    function initAnimations() {
      // Split text for animations
      const splitTextElements = document.querySelectorAll(".split-text")
      splitTextElements.forEach((element) => {
        new SplitText(element, { type: "chars", charsClass: "char" })
      })
  
      // Hero section animations
      const heroTimeline = gsap.timeline()
  
      heroTimeline
        .from(".hero-greeting", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".hero-title-text",
          {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".hero-subtitle-wrapper",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          ".hero-description .char",
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.01,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .from(
          ".hero-social",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          ".scroll-down",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".floating-element",
          {
            opacity: 0,
            scale: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.6",
        )
  
      // Typing effect in hero section
      const roles = ["digital experiences", "secure applications", "interactive websites", "modern interfaces"]
      let currentIndex = 0
  
      function typeAndDelete() {
        const typingText = document.getElementById("typing-text")
        if (!typingText) return // Safety check
  
        const role = roles[currentIndex]
  
        // Type the text
        gsap.to(typingText, {
          duration: 1.2,
          text: role,
          ease: "none",
          onComplete: () => {
            // Pause at the end of typing
            gsap.delayedCall(1.5, () => {
              // Delete the text
              gsap.to(typingText, {
                duration: 0.8,
                text: "",
                ease: "none",
                onComplete: () => {
                  // Move to next role
                  currentIndex = (currentIndex + 1) % roles.length
                  gsap.delayedCall(0.5, typeAndDelete)
                },
              })
            })
          },
        })
      }
  
      // Start typing effect
      gsap.delayedCall(1, typeAndDelete)
  
      // Animate stats counter
      const statItems = document.querySelectorAll(".stat-item")
      statItems.forEach((item) => {
        const statNumber = item.querySelector(".stat-number")
        const finalValue = Number.parseInt(item.getAttribute("data-value"))
  
        gsap.to(statNumber, {
          scrollTrigger: {
            trigger: item,
            scroller: "[data-scroll-container]",
            start: "top 80%",
            toggleActions: "play none none none",
          },
          innerText: finalValue,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power2.out",
        })
      })
  
      // Section animations
      gsap.utils.toArray(".section-header").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            scroller: "[data-scroll-container]",
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
        })
      })
  
      // About section animations
      gsap.from(".profile-image", {
        scrollTrigger: {
          trigger: ".about-content",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "power3.out",
      })
  
      gsap.from(".about-text h3", {
        scrollTrigger: {
          trigger: ".about-text",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      })
  
      gsap.from(".about-text .split-text .char", {
        scrollTrigger: {
          trigger: ".about-text",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.01,
        ease: "power3.out",
      })
  
      // Interest cards animation
      gsap.from(".interest-card", {
        scrollTrigger: {
          trigger: ".interests-grid",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
  
      // Projects section animations
      gsap.from(".projects-filter", {
        scrollTrigger: {
          trigger: ".projects-filter",
          scroller: "[data-scroll-container]",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      })
  
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".projects-grid",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
  
      // Cybersecurity section animations
      gsap.from(".cyber-intro-icon", {
        scrollTrigger: {
          trigger: ".cyber-intro",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
  
      gsap.from(".cyber-intro .split-text .char", {
        scrollTrigger: {
          trigger: ".cyber-intro",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.01,
        ease: "power3.out",
      })
  
      gsap.from(".initiative-card", {
        scrollTrigger: {
          trigger: ".initiatives-grid",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
  
      gsap.from(".cyber-playground", {
        scrollTrigger: {
          trigger: ".cyber-playground",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      })
  
      // Certifications timeline animation
      gsap.from(".cert-item", {
        scrollTrigger: {
          trigger: ".cert-timeline",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out",
      })
  
      // Skills section animations
      gsap.from(".skills-intro .split-text .char", {
        scrollTrigger: {
          trigger: ".skills-intro",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.01,
        ease: "power3.out",
      })
  
      // Skills section animations
      gsap.from(".skill-category-card", {
        scrollTrigger: {
          trigger: ".skills-categories",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
  
      gsap.from(".skill-tag", {
        scrollTrigger: {
          trigger: ".skills-categories",
          scroller: "[data-scroll-container]",
          start: "top 70%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.out",
      })
  
      gsap.from(".showcase-header", {
        scrollTrigger: {
          trigger: ".skills-showcase",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      })
  
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: ".showcase-timeline",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: (i) => (i % 2 === 0 ? -30 : 30),
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
  
      // Animate skill bars when they come into view
      const skillItems = document.querySelectorAll(".skill-item")
      skillItems.forEach((item) => {
        const progress = item.querySelector(".skill-progress")
        const progressValue = progress.getAttribute("data-progress")
  
        gsap.to(progress, {
          scrollTrigger: {
            trigger: item,
            scroller: "[data-scroll-container]",
            start: "top 90%",
            toggleActions: "play none none none",
          },
          width: `${progressValue}%`,
          duration: 1.5,
          ease: "power2.out",
        })
      })
  
      // Contact section animations
      gsap.from(".contact-info h3", {
        scrollTrigger: {
          trigger: ".contact-info",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      })
  
      gsap.from(".contact-info .split-text .char", {
        scrollTrigger: {
          trigger: ".contact-info",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.01,
        ease: "power3.out",
      })
  
      gsap.from(".contact-item", {
        scrollTrigger: {
          trigger: ".contact-details",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
  
      gsap.from(".contact-form", {
        scrollTrigger: {
          trigger: ".contact-form",
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })
    }
  
    // Project filtering
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        btn.classList.add("active")
  
        // Get filter value
        const filter = btn.getAttribute("data-filter")
  
        // Filter projects
        projectCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
              clearProps: "all",
            })
            card.style.display = "block"
          } else {
            gsap.to(card, {
              opacity: 0,
              scale: 0.8,
              duration: 0.4,
              ease: "power2.out",
              onComplete: () => {
                card.style.display = "none"
              },
            })
          }
        })
      })
    })
  
    // Caesar Cipher functionality
    const cipherInput = document.getElementById("cipher-input")
    const cipherShift = document.getElementById("cipher-shift")
    const cipherOutput = document.getElementById("cipher-output")
  
    function caesarCipher(text, shift) {
      if (!text) return ""
  
      shift = Number.parseInt(shift) % 26
      if (isNaN(shift)) shift = 0
  
      return text
        .split("")
        .map((char) => {
          if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0)
            let shiftedCode
  
            // Uppercase letters
            if (code >= 65 && code <= 90) {
              shiftedCode = ((code - 65 + shift) % 26) + 65
            }
            // Lowercase letters
            else if (code >= 97 && code <= 122) {
              shiftedCode = ((code - 97 + shift) % 26) + 97
            }
  
            return String.fromCharCode(shiftedCode)
          }
          return char
        })
        .join("")
    }
  
    function updateCipher() {
      const text = cipherInput.value
      const shift = cipherShift.value
  
      if (text && shift) {
        cipherOutput.textContent = caesarCipher(text, shift)
      } else {
        cipherOutput.textContent = "Enter text and shift value"
      }
    }
  
    if (cipherInput && cipherShift) {
      cipherInput.addEventListener("input", updateCipher)
      cipherShift.addEventListener("input", updateCipher)
    }
  
    // Password Strength Checker
    const passwordInput = document.getElementById("password-input")
    const strengthProgress = document.getElementById("strength-progress")
    const passwordOutput = document.getElementById("password-output")
  
    function checkPasswordStrength(password) {
      if (!password) return { score: 0, message: "Enter a password" }
  
      let score = 0
      let message = ""
  
      // Length check
      if (password.length < 6) {
        score += 1
        message = "Very weak - Too short"
      } else if (password.length < 10) {
        score += 2
      } else {
        score += 3
      }
  
      // Complexity checks
      if (password.match(/[A-Z]/)) score += 1
      if (password.match(/[a-z]/)) score += 1
      if (password.match(/[0-9]/)) score += 1
      if (password.match(/[^A-Za-z0-9]/)) score += 1
  
      // Determine strength based on score
      if (score < 3) {
        message = "Very weak"
      } else if (score < 5) {
        message = "Weak"
      } else if (score < 7) {
        message = "Moderate"
      } else if (score < 9) {
        message = "Strong"
      } else {
        message = "Very strong"
      }
  
      // Calculate percentage (max score is 10)
      const percentage = (score / 10) * 100
  
      return { score, message, percentage }
    }
  
    function updatePasswordStrength() {
      const password = passwordInput.value
      const { message, percentage } = checkPasswordStrength(password)
  
      strengthProgress.style.width = `${percentage}%`
      passwordOutput.textContent = message
  
      // Change color based on strength
      if (percentage < 30) {
        strengthProgress.style.backgroundColor = "var(--destructive)"
      } else if (percentage < 60) {
        strengthProgress.style.backgroundColor = "orange"
      } else {
        strengthProgress.style.backgroundColor = "var(--primary)"
      }
    }
  
    if (passwordInput && strengthProgress) {
      passwordInput.addEventListener("input", updatePasswordStrength)
    }
  
    // Contact form submission
    const contactForm = document.getElementById("contact-form")
    const toast = document.getElementById("toast")
    const toastTitle = document.querySelector(".toast-title")
    const toastDescription = document.querySelector(".toast-description")
    const toastClose = document.querySelector(".toast-close")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        // Form will be submitted to FormSubmit service
        // This is just for the toast notification
        const submitBtn = document.querySelector(".btn-submit")
        const originalBtnText = submitBtn.innerHTML
  
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>'
        submitBtn.disabled = true
  
        // Show toast after form submission (handled by FormSubmit)
        setTimeout(() => {
          toastTitle.textContent = "Message sent!"
          toastDescription.textContent = "Thank you for your message. I'll get back to you soon."
          toast.classList.add("show")
  
          // Hide toast after 5 seconds
          setTimeout(() => {
            toast.classList.remove("show")
          }, 5000)
        }, 1500)
      })
    }
  
    if (toastClose) {
      toastClose.addEventListener("click", () => {
        toast.classList.remove("show")
      })
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          scroll.scrollTo(targetElement)
        }
      })
    })
  
    // Animate floating elements
    gsap.to(".floating-element", {
      y: -20,
      duration: 3,
      ease: "power1.inOut",
      stagger: {
        each: 0.5,
        repeat: -1,
        yoyo: true,
      },
    })
  
    // Make sure ScrollTrigger and Locomotive Scroll play nice together
    ScrollTrigger.addEventListener("refresh", () => scroll.update())
  
    // Refresh ScrollTrigger to update positions
    ScrollTrigger.refresh()
  })
  
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contact-form')
  
    const showMessage = (msg, color = 'green') => {
      let alert = document.querySelector('#form-alert')
      if (!alert) {
        alert = document.createElement('div')
        alert.id = 'form-alert'
        alert.style.marginTop = '1rem'
        alert.style.fontWeight = 'bold'
        form.appendChild(alert)
      }
      alert.textContent = msg
      alert.style.color = color
    }
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
  
      const formData = Object.fromEntries(new FormData(form).entries())
      console.log('Submitting:', formData)
  
      try {
        const res = await fetch('https://formsubmit.co/ajax/mrfaisalkhan607@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(formData)
        })
  
        const json = await res.json()
        console.log('Response:', json)
  
        if (res.ok) {
          form.reset()
          showMessage('Message sent successfully!')
        } else {
          showMessage('Error sending message. Please try again.', 'red')
        }
      } catch (err) {
        console.error('Fetch error:', err)
        showMessage('Network error. Please try again.', 'red')
      }
    })
  })
  