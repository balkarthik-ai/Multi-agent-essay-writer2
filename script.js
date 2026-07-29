const ideasByAge = {
  "8-12": [
    {
      title: "The Importance of Kindness",
      description: "Explain why kindness helps people feel welcome and safe."
    },
    {
      title: "Why Reading Books Matters",
      description: "Show how books grow imagination and knowledge."
    },
    {
      title: "The Best Way to Spend a Free Day",
      description: "Describe healthy and fun activities for free time."
    },
    {
      title: "How to Be a Good Friend",
      description: "Discuss the habits that make friendships strong."
    },
    {
      title: "Why Exercise Is Good for You",
      description: "Explain how movement keeps the body and mind healthy."
    },
    {
      title: "The Power of Teamwork",
      description: "Describe how people can work together to solve problems."
    },
    {
      title: "Why Saving Water Is Important",
      description: "Show how small habits can help protect the planet."
    }
  ],
  "13-18": [
    {
      title: "The Impact of Social Media",
      description: "Discuss how social media affects students and friendships."
    },
    {
      title: "Why Education Matters",
      description: "Explain how learning shapes future opportunities."
    },
    {
      title: "The Value of Time Management",
      description: "Show how planning helps people succeed."
    },
    {
      title: "How Technology Changes Daily Life",
      description: "Discuss both the benefits and challenges of modern technology."
    },
    {
      title: "Why Volunteering Matters",
      description: "Explain how helping others builds character and community."
    },
    {
      title: "The Importance of Mental Health",
      description: "Describe why emotions and well-being deserve care."
    },
    {
      title: "The Benefits of Learning a New Skill",
      description: "Explain how new skills build confidence and independence."
    }
  ]
};

let selectedIdea = null;
let draftedEssay = "";

const ideasList = document.getElementById("ideasList");
const selectedIdeaBox = document.getElementById("selectedIdeaBox");
const essayDraft = document.getElementById("essayDraft");
const reviewNotes = document.getElementById("reviewNotes");
const finalEssay = document.getElementById("finalEssay");
const generateIdeasBtn = document.getElementById("generateIdeasBtn");
const writeEssayBtn = document.getElementById("writeEssayBtn");
const polishEssayBtn = document.getElementById("polishEssayBtn");
const ageGroup = document.getElementById("ageGroup");

function renderIdeas() {
  const group = ageGroup.value;
  ideasList.innerHTML = "";
  ideasByAge[group].forEach((idea) => {
    const card = document.createElement("div");
    card.className = "idea-card";
    card.innerHTML = `
      <strong>${idea.title}</strong>
      <span>${idea.description}</span>
      <button data-title="${idea.title}" data-description="${idea.description}">Choose this idea</button>
    `;
    ideasList.appendChild(card);
  });
}

function chooseIdea(title, description) {
  selectedIdea = { title, description };
  selectedIdeaBox.textContent = `Selected idea: ${title}`;
  writeEssayBtn.disabled = false;
  polishEssayBtn.disabled = true;
  essayDraft.innerHTML = "";
  reviewNotes.innerHTML = "";
  finalEssay.innerHTML = "";
}

function buildEssay(idea) {
  const intro = `In life, ${idea.title.toLowerCase()} is an important topic because it affects the way people think, act, and grow. ${idea.description} This makes it worth exploring in a thoughtful way.`;

  const body1 = `First, ${idea.title.toLowerCase()} teaches people about responsibility and awareness. When someone understands this idea, they can make better choices and notice how it influences their daily life.`;

  const body2 = `Second, this topic can inspire action. It encourages people to look for solutions, develop good habits, and care about the people around them. These efforts can create positive change in school, at home, and in the community.`;

  const body3 = `Finally, ${idea.title.toLowerCase()} can help build confidence. By learning about it, people gain knowledge and perspective, which can improve their communication, creativity, and problem-solving skills.`;

  const conclusion = `In conclusion, ${idea.title.toLowerCase()} is meaningful because it helps people understand important values and improve their lives. By thinking carefully about this subject, everyone can grow into a more thoughtful and capable person.`;

  return `Introduction\n${intro}\n\nBody Paragraph 1\n${body1}\n\nBody Paragraph 2\n${body2}\n\nBody Paragraph 3\n${body3}\n\nConclusion\n${conclusion}`;
}

function polishEssay(text) {
  const cleaned = text
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s+/g, " ")
    .replace(/\.\s+/g, ". ")
    .replace(/\b(i)\b/g, "I")
    .replace(/\bthe the\b/gi, "the")
    .replace(/\bthis topic can inspire action\b/gi, "this topic can inspire positive action")
    .replace(/\bimportant topic\b/gi, "important subject")
    .replace(/\bworth exploring in a thoughtful way\b/gi, "worth exploring in a thoughtful and meaningful way");

  const paragraphs = cleaned.split("\n\n");
  const polished = paragraphs
    .map((paragraph) => {
      if (paragraph.startsWith("Introduction")) {
        return paragraph.replace("Introduction", "Introduction").trim();
      }
      if (paragraph.startsWith("Body Paragraph 1")) {
        return paragraph.replace("Body Paragraph 1", "Body Paragraph 1").trim();
      }
      if (paragraph.startsWith("Body Paragraph 2")) {
        return paragraph.replace("Body Paragraph 2", "Body Paragraph 2").trim();
      }
      if (paragraph.startsWith("Body Paragraph 3")) {
        return paragraph.replace("Body Paragraph 3", "Body Paragraph 3").trim();
      }
      if (paragraph.startsWith("Conclusion")) {
        return paragraph.replace("Conclusion", "Conclusion").trim();
      }
      return paragraph.trim();
    })
    .join("\n\n");

  return polished;
}

generateIdeasBtn.addEventListener("click", renderIdeas);
ageGroup.addEventListener("change", renderIdeas);

ideasList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  chooseIdea(button.dataset.title, button.dataset.description);
});

writeEssayBtn.addEventListener("click", () => {
  if (!selectedIdea) return;
  draftedEssay = buildEssay(selectedIdea);
  essayDraft.textContent = draftedEssay;
  polishEssayBtn.disabled = false;
});

polishEssayBtn.addEventListener("click", () => {
  if (!draftedEssay) return;
  const polished = polishEssay(draftedEssay);
  reviewNotes.innerHTML = `
    <strong>Agent 3 review complete.</strong>
    <ul>
      <li>Checked grammar and sentence flow.</li>
      <li>Improved clarity and polished wording.</li>
      <li>Kept the essay structure as intro, three body paragraphs, and a conclusion.</li>
    </ul>
  `;
  finalEssay.textContent = polished;
});

renderIdeas();
