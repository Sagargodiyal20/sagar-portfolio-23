/**
 * SAGAR - SYSTEMS & FULL-STACK ENGINEER PORTFOLIO
 * Core Interactive Logic: Theme, Recruiter Mode, Dev Terminal, Project Filters & Modal
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Theme Management (Dark / Light Mode)
  // =========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlRoot = document.documentElement;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('sagar-portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default to dark for tech/systems look
  setTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('sagar-portfolio-theme', theme);

    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggleBtn.title = 'Switch to Light Mode';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggleBtn.title = 'Switch to Dark Mode';
    }
  }

  // =========================================================================
  // 2. Recruiter Fast-Scan Mode Toggle
  // =========================================================================
  const toggleRecruiterModeBtn = document.getElementById('toggleRecruiterModeBtn');
  const recruiterSnapshot = document.getElementById('recruiterSnapshot');

  toggleRecruiterModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('recruiter-mode-active');
    const isActive = document.body.classList.contains('recruiter-mode-active');

    if (isActive) {
      showToast('⚡ Recruiter Fast-Scan Active: Key metrics & strengths highlighted!');
      toggleRecruiterModeBtn.innerHTML = '<i class="fa-solid fa-check"></i> Recruiter Mode On';
      recruiterSnapshot.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      showToast('Standard View Restored');
      toggleRecruiterModeBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> Recruiter Fast Scan';
    }
  });

  // =========================================================================
  // 3. Mobile Navigation Menu
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    const isOpen = navLinks.classList.contains('mobile-open');
    mobileMenuBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  // Close mobile menu when clicking any nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('mobile-open')) {
        navLinks.classList.remove('mobile-open');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  });

  // =========================================================================
  // 4. Project Filtering
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 5. Architecture Deep-Dive Modal
  // =========================================================================
  const projectModal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeModalFooterBtn = document.getElementById('closeModalFooterBtn');

  const projectDetails = {
    'kv-cache': {
      title: 'High-Throughput Distributed Key-Value Store (C++20)',
      html: `
        <div class="modal-detail">
          <h4>Architecture & Concurrency Design</h4>
          <p>
            Designed for sub-millisecond p99 latency under heavy concurrent read/write workloads. Built using modern C++20 with strict RAII resource ownership and zero raw memory leaks.
          </p>
          <ul style="margin: 1rem 0 1rem 1.25rem; line-height: 1.7;">
            <li><strong>Memory Slab Allocator:</strong> Pre-allocates memory blocks in slabs to eradicate heap fragmentation caused by rapid allocations/deallocations.</li>
            <li><strong>Thread-Safe Sharding:</strong> Partitioned key space across 16 independent mutex-guarded shards to reduce thread contention by 85%.</li>
            <li><strong>Network Event Loop:</strong> Epoll-based non-blocking I/O handler servicing up to 10,000 active client TCP sockets concurrently.</li>
            <li><strong>Automated CI Benchmark:</strong> Integrated Google Benchmark and Google Test in GitHub Actions CI to catch latency regressions before merging PRs.</li>
          </ul>
          <h4>Teamwork & Engineering Impact</h4>
          <p>
            Collaborated in a 3-engineer squad. Authored technical design doc for the binary wire protocol and mentored peer developers on lock-free queue debugging.
          </p>
        </div>
      `
    },
    'wasm-dsp': {
      title: 'Real-Time Algorithmic Audio & Signal Visualizer (C++ / Wasm / React)',
      html: `
        <div class="modal-detail">
          <h4>Full-Stack Hybrid Architecture</h4>
          <p>
            Bridges computation-heavy C++ routines with an interactive React frontend via WebAssembly and shared memory buffers.
          </p>
          <ul style="margin: 1rem 0 1rem 1.25rem; line-height: 1.7;">
            <li><strong>C++ WebAssembly Core:</strong> Computes high-performance Fast Fourier Transforms (FFT) and filtering compiled with Emscripten.</li>
            <li><strong>Zero-Copy Shared ArrayBuffer:</strong> Audio byte streams transfer directly into WebAssembly linear memory without garbage collection hiccups.</li>
            <li><strong>React + Canvas UI:</strong> Renders real-time 60 FPS spectrum waterfall and 3D frequency waveforms.</li>
            <li><strong>Cross-Functional Collaboration:</strong> Paired with frontend UX designer to define responsive component boundaries and audio playback controls.</li>
          </ul>
        </div>
      `
    },
    'c-threadpool': {
      title: 'Custom POSIX Task Scheduler & Thread Pool (C11)',
      html: `
        <div class="modal-detail">
          <h4>Low-Level Concurrency & POSIX Internals</h4>
          <p>
            An industrial-grade multithreaded task scheduler built in ISO C11 adhering strictly to Linux POSIX system call standards.
          </p>
          <ul style="margin: 1rem 0 1rem 1.25rem; line-height: 1.7;">
            <li><strong>Worker Pool Lifecycle:</strong> Dynamically spawns thread workers with pthread_create, coordinating task dispatch using condition variables (pthread_cond_wait).</li>
            <li><strong>Work-Stealing Priority Queue:</strong> Minimizes idle worker threads through dynamic queue stealing during skewed workload distributions.</li>
            <li><strong>Sanitizer Verification:</strong> Validated against 1,000,000 concurrent task injections using Clang AddressSanitizer (ASan) and ThreadSanitizer (TSan) with zero data races.</li>
            <li><strong>Developer Documentation:</strong> Packaged as a clean reusable static library with complete Doxygen documentation.</li>
          </ul>
        </div>
      `
    },
    'code-sandbox': {
      title: 'Collaborative C/C++ Code Review & Sandbox Runner (Full-Stack)',
      html: `
        <div class="modal-detail">
          <h4>Cloud Architecture & Team Tooling</h4>
          <p>
            A full-stack collaborative developer environment where engineering teams can safely compile, run, and review C and C++ snippets.
          </p>
          <ul style="margin: 1rem 0 1rem 1.25rem; line-height: 1.7;">
            <li><strong>Docker Sandboxing:</strong> Safely isolates user code execution inside lightweight Alpine Linux containers with strict CPU core and RAM cgroups.</li>
            <li><strong>Real-Time Team Sync:</strong> Socket.io and Redis pub/sub power live multi-user editing and inline code review annotations.</li>
            <li><strong>Full-Stack Stack:</strong> React frontend, Node.js/Express REST microservice, PostgreSQL for persistent snippets, and Redis for rate-limiting.</li>
            <li><strong>Leadership & Coordination:</strong> Led 4 developers across sprint cycles, facilitated agile standups, and conducted architecture design reviews.</li>
          </ul>
        </div>
      `
    }
  };

  document.querySelectorAll('.inspect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      const details = projectDetails[projectKey];

      if (details) {
        modalTitle.textContent = details.title;
        modalContent.innerHTML = details.html;
        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  const closeModal = () => {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
  };

  closeModalBtn.addEventListener('click', closeModal);
  closeModalFooterBtn.addEventListener('click', closeModal);
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal();
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // =========================================================================
  // 6. Interactive Developer Terminal
  // =========================================================================
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const runCmdBtn = document.getElementById('runCmdBtn');
  const clearTerminalBtn = document.getElementById('clearTerminalBtn');
  const cmdPills = document.querySelectorAll('.cmd-pill');

  let commandHistory = [];
  let historyIndex = -1;

  const terminalCommands = {
    help: () => `
<span class="cmd-response">Available commands:</span>
  <span class="highlight-cmd">help</span>            - Display this manual
  <span class="highlight-cmd">skills</span>          - List technical proficiencies (C, C++, Web, Tools)
  <span class="highlight-cmd">projects</span>        - View featured systems and full-stack projects
  <span class="highlight-cmd">teamwork</span>        - Read about engineering collaboration & culture
  <span class="highlight-cmd">run demo.cpp</span>    - Compile & execute sample modern C++ code
  <span class="highlight-cmd">valgrind-check</span>  - Run simulated memory leak analysis
  <span class="highlight-cmd">whoami</span>          - Brief engineer bio & background
  <span class="highlight-cmd">contact</span>         - Get email, LinkedIn, and GitHub links
  <span class="highlight-cmd">clear</span>           - Clear the terminal screen
`,
    skills: () => `
<span class="cmd-response">Technical Competency Matrix:</span>
[+] <span class="highlight-cmd">Systems & Low-Level:</span> C (C99/C11), C++ (C++17/20), STL, Pointers, Memory Pools, RAII, Multithreading, Sockets, CMake, GDB, Valgrind
[+] <span class="highlight-cmd">Full-Stack & Web:</span> TypeScript, React.js, Node.js, Express, WebSockets, RESTful APIs, WebAssembly, HTML5, CSS3, Tailwind
[+] <span class="highlight-cmd">Databases & DevOps:</span> PostgreSQL, Redis, Docker, Linux/Bash, CI/CD (GitHub Actions)
[+] <span class="highlight-cmd">Teamwork & Agile:</span> Git-Flow, Peer PR Code Reviews, RFC Design Specs, Sprint Planning, Jira, Mentorship
`,
    'cat skills.txt': () => terminalCommands.skills(),
    projects: () => `
<span class="cmd-response">Featured Software Projects:</span>
1. <span class="highlight-cmd">High-Throughput Key-Value Store</span> (C++20, Epoll, 150k ops/sec, team of 3)
2. <span class="highlight-cmd">Algorithmic Audio & Signal DSP</span> (C++, WebAssembly, React, 60fps)
3. <span class="highlight-cmd">Custom POSIX Task Scheduler</span> (C11, pthreads, zero leaks in Valgrind)
4. <span class="highlight-cmd">Collaborative Code Review Runner</span> (Node.js, Docker sandboxing, React, PostgreSQL)
Type <span class="highlight-cmd">run demo.cpp</span> or inspect cards above for architecture deep-dives!
`,
    teamwork: () => `
<span class="cmd-response">Engineering Teamwork Philosophy:</span>
"Software development is a team sport. High-performing code is born from high-trust collaboration."
• <span class="highlight-cmd">Constructive Code Reviews:</span> Over 100+ PRs reviewed with empathy, focusing on memory safety, logic, and mentorship.
• <span class="highlight-cmd">RFCs Before Code:</span> Writing clear design specifications to achieve consensus before multi-week implementations.
• <span class="highlight-cmd">Agile Execution:</span> Dependable sprint delivery, active standup participation, and automated CI pipelines.
`,
    whoami: () => `
<span class="cmd-response">Engineer Bio:</span>
Name: Sagar
Title: Systems & Full-Stack Software Engineer
Specialty: Low-latency C/C++ computing & full-stack web applications
Status: Available for Full-Time Software Engineering Roles (On-site, Hybrid, or Worldwide Remote)
`,
    contact: () => `
<span class="cmd-response">Contact Information:</span>
• Email:    <a href="mailto:sagar.developer@example.com" style="color: #38bdf8; text-decoration: underline;">sagar.developer@example.com</a>
• LinkedIn: <a href="https://linkedin.com" target="_blank" style="color: #38bdf8; text-decoration: underline;">linkedin.com/in/sagar-dev</a>
• GitHub:   <a href="https://github.com" target="_blank" style="color: #38bdf8; text-decoration: underline;">github.com/sagar-dev</a>
• Resume:   <a href="resume.html" target="_blank" style="color: #38bdf8; text-decoration: underline;">View & Print Printable Resume</a>
`,
    'run demo.cpp': () => executeDemoCpp(),
    'g++ -o3 demo.cpp && ./a.out': () => executeDemoCpp(),
    './a.out': () => executeDemoCpp(),
    'valgrind-check': () => `
<span class="cmd-response">Running Valgrind Memory Checker:</span>
==34201== Memcheck, a memory error detector
==34201== Command: ./a.out
==34201== Allocating 64,000,000 bytes in custom memory pool...
==34201== 1,000,000 concurrent queue operations completed.
==34201== Releasing thread resources...
==34201== 
==34201== <span style="color: #34d399; font-weight: bold;">HEAP SUMMARY:</span>
==34201==     in use at exit: 0 bytes in 0 blocks
==34201==   total heap usage: 1 allocs, 1 frees, 64,000,000 bytes allocated
==34201== 
==34201== <span style="color: #34d399; font-weight: bold;">All heap blocks were freed -- no leaks are possible</span>
==34201== <span style="color: #34d399; font-weight: bold;">ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)</span>
==34201== Result: <span style="color: #34d399;">PASS (100% Memory Safe)</span>
`,
    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    }
  };

  function executeDemoCpp() {
    return `
<span class="cmd-response">Compiling with g++ (GCC) 13.2.0 -std=c++20 -O3 -Wall -Wextra -pthread...</span>
<span style="color: #34d399;">[✓] Build completed with 0 warnings.</span>
<span class="cmd-response">Executing binary './a.out'...</span>
----------------------------------------------------------------------
[Benchmark] Initializing Sagar's High-Concurrency Worker Pool...
[Worker-0] Spawned on CPU core 0.
[Worker-1] Spawned on CPU core 1.
[Worker-2] Spawned on CPU core 2.
[Worker-3] Spawned on CPU core 3.
[Workload] 100,000 task packets ingested into lock-free ring buffer.
[Workload] Dispatched to 4 threads; time elapsed: 0.84ms.
[Result] Throughput: <strong>119,047 tasks/sec</strong>.
[Status] All threads joined cleanly via RAII destructor.
----------------------------------------------------------------------
<span style="color: #34d399;">Process finished with exit code 0.</span>
`;
  }

  function handleCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Append command to history
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    // Print command line
    const cmdEcho = document.createElement('div');
    cmdEcho.className = 'term-line';
    cmdEcho.innerHTML = `<span class="prompt-symbol">sagar@dev:~$</span> <span class="cmd-echo">${escapeHtml(cmd)}</span>`;
    terminalOutput.appendChild(cmdEcho);

    // Find and execute handler
    const lowerCmd = cmd.toLowerCase();
    let responseHtml = '';

    if (terminalCommands[lowerCmd]) {
      responseHtml = terminalCommands[lowerCmd]();
    } else if (lowerCmd.includes('skill')) {
      responseHtml = terminalCommands.skills();
    } else if (lowerCmd.includes('project')) {
      responseHtml = terminalCommands.projects();
    } else if (lowerCmd.includes('team')) {
      responseHtml = terminalCommands.teamwork();
    } else if (lowerCmd.includes('demo') || lowerCmd.includes('g++')) {
      responseHtml = executeDemoCpp();
    } else if (lowerCmd.includes('valgrind') || lowerCmd.includes('leak')) {
      responseHtml = terminalCommands['valgrind-check']();
    } else {
      responseHtml = `<span style="color: #f43f5e;">Command not found: "${escapeHtml(cmd)}".</span> Type <span class="highlight-cmd">help</span> for a list of valid commands.`;
    }

    if (responseHtml) {
      const respLine = document.createElement('div');
      respLine.className = 'term-line';
      respLine.innerHTML = responseHtml;
      terminalOutput.appendChild(respLine);
    }

    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    terminalInput.value = '';
  }

  runCmdBtn.addEventListener('click', () => {
    handleCommand(terminalInput.value);
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleCommand(terminalInput.value);
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  clearTerminalBtn.addEventListener('click', () => {
    terminalCommands.clear();
  });

  cmdPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const command = pill.getAttribute('data-command');
      terminalInput.value = command;
      handleCommand(command);
    });
  });

  // =========================================================================
  // 7. Clipboard Helpers
  // =========================================================================
  const copyHeroCodeBtn = document.getElementById('copyHeroCodeBtn');
  if (copyHeroCodeBtn) {
    copyHeroCodeBtn.addEventListener('click', () => {
      const code = document.getElementById('heroCodeSnippet').innerText;
      copyToClipboard(code, 'C++ snippet copied to clipboard!');
    });
  }

  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email');
      copyToClipboard(email, 'Email address copied to clipboard!');
    });
  }

  document.querySelectorAll('.copy-small-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      copyToClipboard(text, 'Copied to clipboard!');
    });
  });

  function copyToClipboard(text, successMsg) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      showToast('Copied text!');
    });
  }

  // =========================================================================
  // 8. Contact Form Handling
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitFormBtn = document.getElementById('submitFormBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Reset errors
      document.getElementById('nameError').textContent = '';
      document.getElementById('emailError').textContent = '';
      document.getElementById('messageError').textContent = '';

      let hasError = false;

      if (!name) {
        document.getElementById('nameError').textContent = 'Please enter your name.';
        hasError = true;
      }

      if (!email || !validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        hasError = true;
      }

      if (!message || message.length < 10) {
        document.getElementById('messageError').textContent = 'Please enter at least 10 characters.';
        hasError = true;
      }

      if (hasError) return;

      // Simulate sending
      submitFormBtn.disabled = true;
      submitFormBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';

      setTimeout(() => {
        submitFormBtn.disabled = false;
        submitFormBtn.innerHTML = '<i class="fa-regular fa-paper-plane"></i> Send Message';

        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
          <strong>Thank you, ${escapeHtml(name)}!</strong> Your message has been received. I look forward to speaking with you!
        `;
        showToast('Message sent successfully!');
        contactForm.reset();

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 8000);
      }, 1000);
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // =========================================================================
  // 9. Toast Notification Engine
  // =========================================================================
  const toast = document.getElementById('toastNotification');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // =========================================================================
  // 10. Footer Current Year
  // =========================================================================
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

});

