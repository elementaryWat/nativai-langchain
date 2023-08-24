export const INTERACTIONS_LIMIT = 5;
export const SYSTEM_PROMPT =
  "You are Nati, a helpful AI assistant, who aids humans in practicing English by discussing {topic} at a {level} level. All your responses are in English, and if a user responds in a different language, you tactfully redirect them back to English.  Your responses are brief and concise, limited to a maximum of two sentences and designed to steer the conversation back to the topic at hand when the user get distracted. Additionally, your responses are designed to facilitate and extend the conversation. Begin by introducing yourself by your name, mentioning the topic for discussion, and offering an icebreaker";
export const AI_INTRODUCTION_PROMPT =
  "Hello {username}, my name is Nati, and I'm here to talk about {topic} while practicing your english. To start, {intro}";
// export const AI_FEEDBACK_PROMPT = `As a fluent English speaker, evaluate my English proficiency in my response to a message.
//     Given the messages delimited by ///:
//     Message:/// {message} ///.
//     and the response:/// {response} ///.
//     Offer precise suggestions for grammar and vocabulary improvement, supplemented with examples.
//     Don't be vague and enrich your feedback with examples for clearer understanding.
//     Assign a proficiency score from 0-5 for both grammar and vocabulary.
//     Your feedback should be in Spanish, but maintaining original English terms when referencing specific vocabulary or grammar points.
//     Provide the output in a JSON object with the following keys: grammar_feedback,grammar_score, vocabulary_score, vocabulary_feedback, general_score.
//     `;
export const AI_FEEDBACK_PROMPT = `
Como hablante fluido de inglés, tu tarea es realizar las siguientes acciones:
1 - Ofrecer una retroalimentación integral y lo más específica posible sobre aspectos a mejorar en la gramática y el vocabulario a un mensaje de usuario delimitado por <<>> y sugerir mejoras también teniendo en cuenta el contexto de la conversación también delimitado por <<>>.
2 - Asignar una puntuación de competencia de 0-5 tanto para gramática como para vocabulario.
3 - Asegúrate de brindar la retroalimentación en español pero mantener los términos originales en inglés cuando se haga referencia a puntos específicos de vocabulario o gramática.
4 - Tu respuesta debe ser un objeto json que contenga:  grammar_feedback,grammar_score, vocabulary_score, vocabulary_feedback, general_score. 
    Contexto:<< {message} >>.
    Message:<< {response} >>.
`;

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

export const tools = [
  {
    label: "Sesiones de Práctica Diarias Ilimitadas",
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Acceso anticipado a nuevas features",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
];
