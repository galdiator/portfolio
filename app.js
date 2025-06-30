const OPENROUTER_API_KEY = "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"; // <--- Put your key here
const MODEL_ID = "deepseek/deepseek-r1:free";

const data = {
  name: "Dhairya Kalra",
  tagline: "Full-Stack Developer · AI & Competitive Programming Enthusiast",
  location: "New Delhi, India",
  email: "kalradhairya21@gmail.com",
  phone: "8882659005",

  education: [
    { degree: "B.Tech Computer Science",
      inst: "Netaji Subhas University of Technology (NSUT)",
      years: "2023 – 2027", score: "CGPA 8.85" },
    { degree: "Class XII",
      inst: "Delhi Public School, Mathura Road",
      year: "2023", score: "94%" }
  ],

  experience: [
    { org: "Pravah NGO", role: "Technology Intern",
      period: "May – Jun 2024",
      desc: "Organised documents, built full-text search, proposed DB migration improving retrieval latency by 40%." }
  ],

  skills: {
    programming: ["C++","Python","JavaScript","TypeScript"],
    frontend: ["React","Next.js","Tailwind","HTML5","CSS3"],
    backend: ["Node.js","Express","MongoDB","REST APIs"],
    tools: ["Git","GitHub","VS Code","Postman"]
  },

  projects: [
    { name: "ChatHub-AI",
      desc: "Real-time multi-model chat (OpenAI, Gemini, Claude).",
      tech: ["Next.js","Tailwind","MongoDB"],
      link: "https://github.com/galdiator/Chathub-ai" },

    // { name: "Algo-Viz",
    //   desc: "Interactive algorithm visualiser for graphs & DP.",
    //   tech: ["React","D3.js"],
    //   link: "https://github.com/galdiator/AlgoViz" }
  ],

  achievements: [
    "CodeChef 2-Knight (Max 1492) – Rank 49 / 40k+ in Starters 148",
    "Codeforces Pupil (Max 1220) – top 15 % globally",
    "IICPC CodeFest’25 – Rank 1072 / 45k+"
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("content");
  if (!root) return console.error("#content not found");
  render(root);
  initThemeToggle();
  initNavToggle();
  initObserver();
  initChatbot();
  // No JS needed for contact form with FormSubmit
});

function render(root){
  root.innerHTML = `
    <section id="home" class="section hero"><div class="container">
      <h1>${data.name}</h1>
      <p>${data.tagline}</p>
      <a class="btn" href="assets/resume.pdf" download>Download Résumé</a>
      <a class="btn btn--ghost" href="#contact">Hire Me</a>
    </div></section>

    <section id="about" class="section"><div class="container">
      <h2>About Me</h2>
      <p>B.Tech student at NSUT with a passion for AI, web development and competitive programming.</p>
    </div></section>

    <section id="education" class="section"><div class="container">
      <h2>Education</h2>
      <div class="timeline">
        ${data.education.map(e=>`
          <div class="timeline__item">
            <h3>${e.degree}</h3>
            <p class="timeline__org">${e.inst}</p>
            <p class="timeline__period">${e.years||e.year}</p>
            <p>${e.score}</p>
          </div>`).join("")}
      </div>
    </div></section>

    <section id="experience" class="section"><div class="container">
      <h2>Experience</h2>
      <div class="timeline">
        ${data.experience.map(x=>`
          <div class="timeline__item">
            <h3>${x.role}</h3>
            <p class="timeline__org">${x.org}</p>
            <p class="timeline__period">${x.period}</p>
            <p>${x.desc}</p>
          </div>`).join("")}
      </div>
    </div></section>

    <section id="skills" class="section"><div class="container">
      <h2>Skills</h2>
      ${Object.entries(data.skills).map(([cat,list])=>`
        <div class="skills__category">
          <h3>${cat[0].toUpperCase()+cat.slice(1)}</h3>
          <div class="skills__list">
            ${list.map(s=>`<span class="skill">${s}</span>`).join("")}
          </div>
        </div>`).join("")}
    </div></section>

    <section id="projects" class="section"><div class="container">
      <h2>Projects</h2>
      <div class="grid">
        ${data.projects.map(p=>`
          <article class="card">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <ul>${p.tech.map(t=>`<li>${t}</li>`).join("")}</ul>
            <a href="${p.link}" target="_blank">Source ↗</a>
          </article>`).join("")}
      </div>
    </div></section>

    <section id="achievements" class="section"><div class="container">
      <h2>Achievements</h2>
      <ul class="timeline">
        ${data.achievements.map(a=>`<li class="timeline__item">${a}</li>`).join("")}
      </ul>
    </div></section>

    <section id="contact" class="section"><div class="container">
      <h2>Contact Me</h2>
      <form class="contact-form" action="https://formsubmit.co/${data.email}" method="POST">
        <div class="form-group">
          <label for="cf-name">Your Name</label>
          <input type="text" id="cf-name" name="name" required placeholder="Enter your name">
        </div>
        <div class="form-group">
          <label for="cf-email">Your Email</label>
          <input type="email" id="cf-email" name="email" required placeholder="Enter your email">
        </div>
        <div class="form-group">
          <label for="cf-message">Your Message</label>
          <textarea id="cf-message" name="message" required placeholder="Type your message"></textarea>
        </div>
        <input type="hidden" name="_captcha" value="false">
        <button type="submit" class="btn">Send Message</button>
      </form>
      <p style="margin-top:2rem;">Or email me directly: <a href="mailto:${data.email}">${data.email}</a></p>
      <p>Phone: <a href="tel:${data.phone}">${data.phone}</a></p>
    </div></section>
  `;
}

function initThemeToggle(){
  const btn=document.getElementById("theme-toggle");
  const saved=localStorage.getItem("theme");
  if(saved) document.documentElement.dataset.theme=saved;
  btn.addEventListener("click",()=>{
    const html=document.documentElement;
    const next=html.dataset.theme==="light"?"dark":"light";
    html.dataset.theme=next;localStorage.setItem("theme",next);
  });
}

function initNavToggle(){
  const burger=document.getElementById("nav-toggle");
  const menu=document.getElementById("nav-menu");
  burger.addEventListener("click",()=>menu.classList.toggle("open"));
  menu.addEventListener("click",e=>{
    if(e.target.classList.contains("nav__link")) menu.classList.remove("open");
  });
}

function initObserver(){
  const io=new IntersectionObserver(ents=>{
    ents.forEach(e=>{if(e.isIntersecting) e.target.classList.add("visible")});
  },{threshold:0.2});
  document.querySelectorAll(".section").forEach(s=>io.observe(s));
}

function initChatbot(){
  const btn=document.getElementById("chat-open");
  const panel=document.getElementById("chatbot");
  const close=document.getElementById("chat-close");
  const form=document.getElementById("chat-form");
  const msgs=document.getElementById("chat-messages");
  const input=document.getElementById("chat-input");

  let chatHistory = [
    {role:"system",content:"You are a helpful assistant who answers questions about Dhairya Kalra. Be concise and relevant."}
  ];

  btn.onclick = () => panel.classList.toggle("open");
  close.onclick = () => panel.classList.remove("open");

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addMsg("user", text);
    chatHistory.push({role:"user", content: text});
    input.value = "";
    addMsg("assistant", "…");
    await reply(text);
  });

  input.addEventListener("input",()=>{
    input.style.height="auto";
    input.style.height=input.scrollHeight+"px";
  });

  function addMsg(role,content){
    const div=document.createElement("div");
    div.className=`msg ${role}`;
    div.textContent=content;
    msgs.append(div);
    msgs.scrollTop=msgs.scrollHeight;
  }
  function replaceLast(content){
    const last=msgs.querySelector(".msg.assistant:last-child");
    if(last) last.textContent=content;
    msgs.scrollTop=msgs.scrollHeight;
  }

  async function reply(prompt){
    try{
      const res=await fetch("https://openrouter.ai/api/v1/chat/completions",{
        method:"POST",
        headers:{
          "Authorization":`Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type":"application/json",
          "HTTP-Referer":window.location.origin,
          "X-Title":"kalra-portfolio"
        },
        body:JSON.stringify({
          model:MODEL_ID,
          max_tokens:256,
          messages: chatHistory
        })
      });
      if(!res.ok) throw new Error(res.statusText);
      const json=await res.json();
      const reply = json.choices[0].message.content.trim();
      chatHistory.push({role:"assistant", content: reply});
      replaceLast(reply);
    }catch(err){
      console.error(err);
      replaceLast("Sorry, something went wrong or the AI is busy. Please try again.");
    }
  }
}
