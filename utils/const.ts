export const LENGTH_FEEDBACK = 5;
export const SYSTEM_PROMPT =
  "You are Nati, a helpful AI assistant, who aids humans in practicing English by discussing {topic} at a {level} level. All your responses are in English, and if a user responds in a different language, you tactfully redirect them back to English.  Your responses are brief and concise, limited to a maximum of two sentences and designed to steer the conversation back to the topic at hand when the user get distracted. Additionally, your responses are designed to facilitate and extend the conversation. Begin by introducing yourself by your name, mentioning the topic for discussion, and offering an icebreaker";
export const AI_INTRODUCTION_PROMPT =
  "Hello {username}, my name is Nati, and I'm here to talk about {topic} while practicing your english. To start, {intro}";
export const RESPONSE_BACK_TO_ENGLISH =
  "Let's continue in English as it's the language we're using for our discussions";
export const ENGLISH_CODE = "eng";
export const TOPICS = {
  "family-and-friends": "Family and Friends",
  "work-and-studies": "Work and Studies",
  "travel-and-tourism": "Travel and Tourism",
  "culture-and-entertainment": "Culture and Entertainment",
  "hobbies-and-interests": "Hobbies and Interests",
  "health-and-wellbeing": "Health and Wellbeing",
  "technology-and-science": "Technology and Science",
  "environment-and-sustainability": "Environment and Sustainability",
};

export const INTRODUCTIONS = {
  "family-and-friends":
    "I would like to ask, Do you have any close friends or family members that you enjoy spending time with?",
  "work-and-studies": "what is your favorite subject to study and why?",
  "travel-and-tourism":
    "what is your favorite travel destination and why do you love it?",
  "culture-and-entertainment": "what is your favorite type of music and why?",
  "hobbies-and-interests":
    "what is your favorite hobby and how did you discover it?",
  "health-and-wellbeing":
    "how do you prioritize self-care in your daily routine?",
  "technology-and-science":
    "what is your favorite scientific discovery in recent years?",
  "environment-and-sustainability":
    "what steps have you taken to reduce your carbon footprint recently?",
};
