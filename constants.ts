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
export const AI_LOCAL_FEEDBACK_PROMPT = `
Como hablante fluido de inglés, tu tarea es realizar las siguientes acciones:
1 - Ofrecer una retroalimentación integral y lo más específica posible sobre aspectos a mejorar en la gramática y el vocabulario a un mensaje de usuario delimitado por <<>> y sugerir mejoras también teniendo en cuenta el contexto de la conversación también delimitado por <<>>.
2 - Asignar una puntuación de competencia de 0-5 tanto para gramática como para vocabulario.
3 - Tener en cuenta la coherencia de la respuesta y la relevancia con el contexto de la conversación. Si no esta relacionado con el tema tratado la relevancia es baja.
4 - Asegúrate de brindar la retroalimentación en español pero mantener los términos originales en inglés cuando se haga referencia a puntos específicos de vocabulario o gramática.
5 - Tu respuesta debe ser un objeto json que contenga:  grammar_feedback,grammar_score, vocabulary_score, vocabulary_feedback, relevancy_score, relevancy_feedback, general_score. 
    Contexto:<< {message} >>.
    Message:<< {response} >>.
`;

export const AI_FINAL_FEEDBACK_PROMPT = `
Como hablante fluido de inglés, tu tarea es realizar las siguientes acciones:
1 - Resumir la lista de feedbacks de gramática y vocabulario una conversacion en ingles delimitados por <<>>.
2 - Brindar 3 action items generales importantes (no especificos) a trabajar en gramática y vocabulario.
3 - Aconsejar 3 temas teóricos de gramática a reforzar a partir de los action items.
4 - Tu respuesta debe ser un objeto json que contenga:  action_items,  topics_to_review.
    Feedbacks gramatica:<< {grammarFeedbacks} >>.
    Feedbacks vocabulario:<< {vocabularyFeedbacks} >>.
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
  "family-and-friends": [
    "Who in your family do you think you're most similar to?",
    "Do you have a family tradition that you love the most?",
    "What qualities do you value the most in your friends?",
    "Do you prefer spending time with a small group of close friends or in larger gatherings?",
    "How do you and your friends typically celebrate birthdays or other milestones?",
  ],
  "work-and-studies": [
    "Have you ever had a teacher who greatly influenced your life? How so?",
    "What would be your dream job and why?",
    "Do you prefer group projects or working alone?",
    "Which professional skill are you currently working on improving?",
    "How do you manage stress or pressure at school or work?",
  ],
  "travel-and-tourism": [
    "If you could live in any city in the world for a year, which would it be and why?",
    "What's the most adventurous thing you've done while traveling?",
    "Do you prefer beach vacations or exploring the mountains?",
    "Which country's cuisine have you enjoyed the most during your travels?",
    "What's one travel experience that changed your perspective on life?",
  ],
  "culture-and-entertainment": [
    "Which movie or book has had the biggest impact on you?",
    "Do you enjoy going to live performances, like plays or concerts?",
    "Which cultural festival do you wish to attend at least once in your life?",
    "Who's your favorite artist or band right now?",
    "If you could spend a day with a historical figure, who would it be and why?",
  ],
  "hobbies-and-interests": [
    "Have you recently picked up any new hobbies?",
    "What's a hobby you wish you had more time or resources for?",
    "Do you prefer hobbies that challenge your mind or your body?",
    "Have any of your hobbies turned into a passion or even a career?",
    "How do you find new interests or activities to try out?",
  ],
  "health-and-wellbeing": [
    "Do you have a morning or evening routine that helps you feel refreshed?",
    "How do you usually recharge after a long day?",
    "Do you practice mindfulness or meditation?",
    "What's your go-to healthy snack?",
    "How do you stay motivated to keep up with fitness or wellness routines?",
  ],
  "technology-and-science": [
    "Do you think we rely too much on technology these days?",
    "Which piece of tech can you not live without?",
    "What are your thoughts on artificial intelligence and its impact on our future?",
    "Are there any scientific theories or concepts that particularly fascinate you?",
    "How do you keep up with the rapid advancements in science and technology?",
  ],
  "environment-and-sustainability": [
    "Do you have any eco-friendly habits that you're proud of?",
    "What are your views on renewable energy?",
    "How do you reduce waste in your daily life?",
    "Do you think individual actions can make a significant difference in environmental conservation?",
    "Which sustainable practice do you think should be adopted globally?",
  ],
};

export const tools = [
  {
    label: "Sesiones de Práctica Diarias ilimitadas",
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Acceso anticipado a las nuevas versiones",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
];
