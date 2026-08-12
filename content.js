/* Hyderabadi (Dakhini) Urdu — starter content
   Romanized on purpose. This is a STARTER deck of widely-known Hyderabadi/Dakhini
   features — dialect varies a lot by family and mohalla, so treat these as a base
   and use "Add Word" to correct/extend them with what your own family actually says.
*/

const CONTENT = {
  categories: [
    {
      id: "connectors",
      title: "Everyday Connectors",
      blurb: "The small words that make you sound Hyderabadi instead of textbook-Urdu.",
      cards: [
        { hu: "Hau", en: "Yeah / yes (casual)", note: "Casual alternative to 'haan'. Very Dakhini." },
        { hu: "Nakko", en: "Don't want it / no", note: "One of the most iconic Hyderabadi words. 'Mereku nakko' = I don't want it." },
        { hu: "Kaiku", en: "Why", note: "Dakhini form of standard Urdu/Hindi 'kyun'." },
        { hu: "Kaiku ke", en: "Because", note: "Answer to 'kaiku'. Lit. 'why that'." },
        { hu: "Ekdum", en: "Totally / completely", note: "'Ekdum sahi' = totally right." },
        { hu: "Bemaza", en: "No fun / boring / flat", note: "Opposite of 'maza' (fun)." },
        { hu: "Pora", en: "Enough, stop it", note: "'Bas pora kar' = enough, stop it now." },
        { hu: "Arre", en: "Hey / oh (attention, surprise)", note: "Universal Hindustani interjection, used constantly." },
        { hu: "Chal na", en: "Come on / let's go", note: "Also used to mean 'stop joking'." },
        { hu: "Chal maara", en: "Forget it / whatever, let it go", note: "Dismissive, casual — 'don't worry about it'." },
        { hu: "Waisay", en: "By the way / anyway", note: "Shared with standard Urdu, used a lot in casual talk." },
        { hu: "Bilkul", en: "Absolutely / for sure", note: "Strong agreement." },
        { hu: "Faltu", en: "Useless / pointless", note: "'Faltu baat mat kar' = don't talk nonsense." },
        { hu: "Zyada", en: "Too much / a lot", note: "'Zyada mat bol' = don't talk too much." },
        { hu: "Thoda si", en: "A little bit", note: "'Thoda si ruk' = wait a little." },
        { hu: "Seedha", en: "Straight / directly / simply", note: "Also means honest/straightforward." },
        { hu: "Fatafat", en: "Quickly, fast", note: "'Fatafat kar' = do it quickly." },
        { hu: "Ekdum se", en: "All of a sudden", note: "Different from plain 'ekdum' (totally)." }
      ]
    },
    {
      id: "asking",
      title: "Asking & Answering",
      blurb: "How questions and quick answers actually sound in casual speech.",
      cards: [
        { hu: "Kya kar raha / Kya kar rahi", en: "What are you doing?", note: "Helper verb dropped — standard would add 'ho'." },
        { hu: "Kahan ja raha?", en: "Where are you going?", note: "" },
        { hu: "Kaiku nai aaya?", en: "Why didn't you come?", note: "'nai' = colloquial 'nahi'." },
        { hu: "Kya scene hai?", en: "What's the plan / what's going on?", note: "Very common casual opener among friends." },
        { hu: "Kaiku bola aisa?", en: "Why did you say that?", note: "" },
        { hu: "Kab aayega?", en: "When will you come?", note: "" },
        { hu: "Kaam ho gaya kya?", en: "Is the work done?", note: "'kya' at the end turns a statement into a yes/no question." },
        { hu: "Mereku pata nai", en: "I don't know", note: "'mereku' = to me (Dakhini for 'mujhe')." },
        { hu: "Tereku maloom hai kya?", en: "Do you know?", note: "'tereku' = to you (Dakhini for 'tujhe')." },
        { hu: "Haan hai / Nakko hai", en: "Yes it is / No it isn't", note: "" },
        { hu: "Theek hai na?", en: "It's fine, right?", note: "Tag question — checking agreement." },
        { hu: "Sunn re, ek baat bolu?", en: "Listen, can I say something?", note: "Common conversational opener." },
        { hu: "Kya bol raha tha?", en: "What were you saying?", note: "" },
        { hu: "Samajh mein aaya kya?", en: "Did you understand?", note: "" },
        { hu: "Mereku samajh nai aaya", en: "I didn't understand", note: "" }
      ]
    },
    {
      id: "family",
      title: "Family & Greetings",
      blurb: "How relatives actually talk to each other day to day.",
      cards: [
        { hu: "Kaisa hai / Kaisi hai?", en: "How are you? (casual, to peer/younger)", note: "" },
        { hu: "Sub theek?", en: "Everything okay?", note: "Short version of 'sub kuch theek hai?'" },
        { hu: "Khana kha liya kya?", en: "Have you eaten?", note: "Classic family check-in question." },
        { hu: "Ammi kahan hai?", en: "Where's Mom?", note: "" },
        { hu: "Abbu se bol diya kya?", en: "Did you tell Dad?", note: "" },
        { hu: "Ghar kab aayega?", en: "When will you come home?", note: "" },
        { hu: "Tabiyat kaisi hai?", en: "How's your health?", note: "Common with elders." },
        { hu: "Dua mein yaad rakhna", en: "Keep me in your prayers", note: "Common closing line, especially to elders." },
        { hu: "Salaam, kaise hain aap?", en: "Greetings, how are you? (respectful)", note: "'aap' form used for elders/respect." },
        { hu: "Khuda hafiz", en: "Goodbye (lit. God protect you)", note: "Common parting phrase." },
        { hu: "Mubarak ho", en: "Congratulations", note: "" },
        { hu: "Aap ki tabiyat ka khayal rakhna", en: "Take care of your health", note: "Respectful, said to elders." },
        { hu: "Bacchon ko pyaar", en: "Love to the kids", note: "Common sign-off in family calls." }
      ]
    },
    {
      id: "daily",
      title: "Daily Life & Plans",
      blurb: "Talking about your day, work, and making plans.",
      cards: [
        { hu: "Aaj kaam pe ja raha kya?", en: "Are you going to work today?", note: "" },
        { hu: "Kal milte hain", en: "Let's meet tomorrow", note: "" },
        { hu: "Time nai hai mereku", en: "I don't have time", note: "" },
        { hu: "Thoda busy hoon abhi", en: "I'm a bit busy right now", note: "" },
        { hu: "Chalo nikalte hain", en: "Come on, let's head out", note: "" },
        { hu: "Der ho rahi hai", en: "It's getting late", note: "" },
        { hu: "Jaldi kar, late ho raha", en: "Hurry up, it's getting late", note: "" },
        { hu: "Kal chutti hai", en: "Tomorrow's a day off", note: "" },
        { hu: "Kaam khatam karke aata hoon", en: "I'll come after finishing work", note: "" },
        { hu: "Ruk zara, aata hoon", en: "Wait a sec, I'm coming", note: "" },
        { hu: "Aaram se aa", en: "Come safely / take your time", note: "Common thing to say before someone travels." },
        { hu: "Raste mein hoon", en: "I'm on the way", note: "" },
        { hu: "Ghar pahunch ke bata dena", en: "Let me know when you reach home", note: "" }
      ]
    },
    {
      id: "food",
      title: "Food Talk",
      blurb: "Food comes up constantly in Hyderabadi conversation.",
      cards: [
        { hu: "Khana ban gaya kya?", en: "Is the food ready?", note: "" },
        { hu: "Mereku bhookh lagi hai", en: "I'm hungry", note: "" },
        { hu: "Kya khaega / khaegi?", en: "What will you eat?", note: "" },
        { hu: "Biryani khaane chalein?", en: "Shall we go eat biryani?", note: "" },
        { hu: "Bahut mirchi hai isme", en: "This is very spicy", note: "" },
        { hu: "Aur thoda de do", en: "Give a little more", note: "" },
        { hu: "Bas, itna kaafi hai", en: "That's enough, this is plenty", note: "" },
        { hu: "Zabardast bana hai khana", en: "The food came out amazing", note: "" },
        { hu: "Chai pilo pehle", en: "Have some tea first", note: "Classic hospitality line." },
        { hu: "Mehmaan aa rahe hain, jaldi karo", en: "Guests are coming, hurry up", note: "" }
      ]
    },
    {
      id: "feelings",
      title: "Feelings & Opinions",
      blurb: "Saying how you feel and what you think, not just what you did.",
      cards: [
        { hu: "Mereku accha laga", en: "I liked it", note: "" },
        { hu: "Mereku bilkul pasand nai", en: "I don't like it at all", note: "" },
        { hu: "Gussa mat ho", en: "Don't get angry", note: "" },
        { hu: "Tension mat le", en: "Don't stress / don't worry", note: "" },
        { hu: "Mereku dar lag raha", en: "I'm scared", note: "" },
        { hu: "Bahut khushi hui sunke", en: "I was very happy to hear that", note: "" },
        { hu: "Sharam aati hai mereku", en: "I feel shy / embarrassed", note: "" },
        { hu: "Thak gaya / thak gayi", en: "I'm tired", note: "" },
        { hu: "Mann nai kar raha", en: "I don't feel like it", note: "Very commonly used to decline something politely." },
        { hu: "Achanak se yaad aaya", en: "It suddenly came to mind", note: "" },
        { hu: "Mereku lagta hai sahi hai", en: "I think it's right", note: "" }
      ]
    },
    {
      id: "banter",
      title: "Teasing & Banter",
      blurb: "Hyderabadi conversation runs on friendly teasing — good to recognize and use.",
      cards: [
        { hu: "Kya miya, kahan tha itne din?", en: "Hey dude, where were you all these days?", note: "'Miya' = casual term of address, like 'bro/dude'." },
        { hu: "Bawa, mazak kar raha", en: "Bro, I'm just joking", note: "'Bawa' another casual term of address." },
        { hu: "Aaactly mereku bhi wahi lagta", en: "Actually I think the same thing", note: "'Aaactly' is a very Hyderabadi stretched pronunciation of 'actually'." },
        { hu: "Chumma aise bola", en: "I said it just for no reason / just kidding", note: "'Chumma' = just, for no reason." },
        { hu: "Phas gaya na ab?", en: "Now you're stuck, huh?", note: "Teasing someone caught in a bind." },
        { hu: "Tereku kya hua re?", en: "What happened to you? (teasing/concern)", note: "" },
        { hu: "Zyada mat udd", en: "Don't get too full of yourself", note: "Lit. 'don't fly too much' — teasing someone acting proud." },
        { hu: "Nakhra mat kar", en: "Stop being fussy / dramatic", note: "" },
        { hu: "Kya nakhre hain tere", en: "What's with all your fuss/attitude", note: "" },
        { hu: "Chal jhoothi / chal jhootha", en: "Yeah right, liar", note: "Playful disbelief among close friends." }
      ]
    },
    {
      id: "grammar",
      title: "Grammar Patterns",
      blurb: "The recurring patterns that make sentences sound Hyderabadi instead of textbook Urdu — worth drilling on their own.",
      cards: [
        { hu: "mereku (not mujhe)", en: "'to me' — object form of 'I'", note: "Standard Urdu 'mujhe' becomes 'mereku' in Dakhini. Used constantly: 'mereku chahiye', 'mereku pata hai'." },
        { hu: "tereku (not tujhe)", en: "'to you' — casual/informal object form", note: "Standard 'tujhe' becomes 'tereku'. Only for close/informal relationships." },
        { hu: "uneku (not use)", en: "'to him/her' — object form", note: "Standard 'use' becomes 'uneku' in casual Dakhini speech." },
        { hu: "nakko + verb", en: "negation pattern for 'don't want'", note: "'Mereku jaana nakko' = I don't want to go. Nakko often replaces 'nahi chahiye' entirely." },
        { hu: "helper verb drop", en: "'kya kar raha' instead of 'kya kar rahe ho'", note: "Dakhini casually drops the helper verb (ho/hain) that standard Urdu keeps — makes speech faster and more casual." },
        { hu: "kya at sentence end", en: "turns a statement into a yes/no question", note: "'Aaya kya?' = Did (he/she) come? Just adding 'kya' at the end does the job — no need to restructure the sentence." },
        { hu: "re / ri as address tags", en: "casual tag added when calling someone", note: "'Sun re' (to a male) / 'Sun ri' (to a female) = 'listen'. Informal, used with peers or younger people, not elders." }
      ]
    }
  ]
};
