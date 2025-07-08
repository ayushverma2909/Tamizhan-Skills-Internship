import re
import nltk
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize

nltk.download('punkt')

stemmer = PorterStemmer()

intent_keywords = {
    "greeting": ["hello", "hi", "hey", "good morning", "good evening", "greetings"],
    "courses": ["course", "corse", "coarse", "mini", "program", "class", "bootcamp"],
    "fees": ["fee", "fees", "cost", "price", "charges"],
    "placement": ["placement", "job", "intern", "career", "work"],
    "free_training": ["free", "transgender", "differently", "abled"],
    "competitive": ["ssc", "tnpsc", "exam", "competitive", "jee", "neet", "rrb"],
    "certificates": ["certificate", "certification", "proof"],
    "credential": ["dice", "wipro", "credential", "verified"],
    "contact": ["contact", "email", "phone", "reach"],
    "website": ["website", "site", "web"],
    "whatsapp": ["whatsapp", "message"],
    "enroll": ["enroll", "register", "admission", "apply"],
    "location": ["location", "where", "place"],
    "duration": ["duration", "time", "length", "long"],
    "timing": ["timing", "schedule", "hour", "when"],
    "languages": ["language", "tamil", "english"],
    "instructors": ["teacher", "trainer", "instructor"],
    "demo": ["demo", "sample", "trial"],
    "support": ["help", "support", "assist"],
    "exit": ["exit", "quit", "bye", "goodbye"]
}

def match_intent(text):
    tokens = word_tokenize(text.lower())
    stems = [stemmer.stem(t) for t in tokens]

    for intent, keywords in intent_keywords.items():
        for keyword in keywords:
            stemmed_kw = stemmer.stem(keyword)
            if stemmed_kw in stems:
                return intent
    return "unknown"
