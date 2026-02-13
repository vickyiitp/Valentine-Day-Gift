
import { WishFormData, Tone, RelationshipType } from "../types";

// Helper to simulate typing effect for a better UX
const simulateTyping = async (text: string, onUpdate: (chunk: string) => void) => {
  const chunkSize = 3;
  let currentText = "";
  for (let i = 0; i < text.length; i += chunkSize) {
    currentText += text.slice(i, i + chunkSize);
    onUpdate(currentText);
    await new Promise(resolve => setTimeout(resolve, 30)); // 30ms delay
  }
};

const WISHES = [
  // --- ROMANTIC (MARRIED/DATING) ---
  { text: "Every day I spend with you is my new favorite day. Happy Valentine's Day to my forever love.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "Growing old with you is the best gift I could ever ask for.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.MARRIED] },
  { text: "You're my favorite place to go to when my mind searches for peace.", tones: [Tone.ROMANTIC, Tone.POETIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING, RelationshipType.LONG_DISTANCE] },
  { text: "In a sea of people, my eyes will always search for you.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.DATING, RelationshipType.CRUSH] },
  { text: "I love you not only for what you are, but for what I am when I am with you.", tones: [Tone.ROMANTIC, Tone.POETIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "My heart is and always will be yours.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known.", tones: [Tone.ROMANTIC, Tone.APPRECIATIVE], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "Meeting you was fate, becoming your friend was a choice, but falling in love with you was beyond my control.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "You are my today and all of my tomorrows.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "If I could have anyone in the world, it would still be you.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "Loving you is like breathing; how can I stop?", tones: [Tone.ROMANTIC, Tone.POETIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "You are the missing piece to my puzzle.", tones: [Tone.ROMANTIC, Tone.CHEESY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "Every love story is beautiful, but ours is my favorite.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "I never knew what love was until I met you.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "You are the best thing that ever happened to me.", tones: [Tone.ROMANTIC, Tone.APPRECIATIVE], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "I choose you. And I'll choose you over and over and over. Without pause, without a doubt, in a heartbeat.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },

  // --- FUNNY ---
  { text: "You are the reason I look down at my phone and smile. Then walk into a pole.", tones: [Tone.FUNNY, Tone.ROMANTIC], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "I love you with all my butt. I would say heart, but my butt is bigger.", tones: [Tone.FUNNY], relationships: [RelationshipType.MARRIED, RelationshipType.DATING, RelationshipType.BEST_FRIENDS] },
  { text: "Thanks for being my emergency contact.", tones: [Tone.FUNNY], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "You're the only person I want to annoy for the rest of my life.", tones: [Tone.FUNNY, Tone.ROMANTIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "I love you more than coffee, but please don't make me prove it.", tones: [Tone.FUNNY], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "Happy Valentine's Day! I'm yours. No refunds.", tones: [Tone.FUNNY], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "I'm so glad you settled for me.", tones: [Tone.FUNNY], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "You're lucky I have terrible taste in everything but you.", tones: [Tone.FUNNY], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "I love you even when I'm hangry.", tones: [Tone.FUNNY], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "Thanks for keeping my feet warm at night.", tones: [Tone.FUNNY, Tone.APPRECIATIVE], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "Love is being stupid together.", tones: [Tone.FUNNY], relationships: [RelationshipType.MARRIED, RelationshipType.DATING, RelationshipType.BEST_FRIENDS] },
  { text: "I love you almost as much as I love pizza.", tones: [Tone.FUNNY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "You're the Obi-Wan for me.", tones: [Tone.FUNNY, Tone.CHEESY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "Let's commit the perfect crime. I'll steal your heart, you steal mine.", tones: [Tone.FUNNY, Tone.CHEESY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "You're cute. Can I keep you?", tones: [Tone.FUNNY, Tone.ROMANTIC], relationships: [RelationshipType.DATING, RelationshipType.CRUSH] },
  { text: "I plan on bugging you for a long, long time.", tones: [Tone.FUNNY], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "All you need is love. But a little chocolate now and then doesn't hurt.", tones: [Tone.FUNNY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED, RelationshipType.BEST_FRIENDS] },

  // --- CHEESY ---
  { text: "Are you a magician? Because whenever I look at you, everyone else disappears.", tones: [Tone.CHEESY, Tone.ROMANTIC], relationships: [RelationshipType.DATING, RelationshipType.CRUSH] },
  { text: "Do you have a map? I keep getting lost in your eyes.", tones: [Tone.CHEESY], relationships: [RelationshipType.DATING, RelationshipType.CRUSH] },
  { text: "I must be a snowflake, because I've fallen for you.", tones: [Tone.CHEESY], relationships: [RelationshipType.DATING, RelationshipType.CRUSH] },
  { text: "If you were a vegetable, you'd be a cute-cumber.", tones: [Tone.CHEESY, Tone.FUNNY], relationships: [RelationshipType.DATING, RelationshipType.BEST_FRIENDS] },
  { text: "We go together like peanut butter and jelly.", tones: [Tone.CHEESY], relationships: [RelationshipType.DATING, RelationshipType.BEST_FRIENDS, RelationshipType.MARRIED] },
  { text: "You've stolen a pizza my heart.", tones: [Tone.CHEESY, Tone.FUNNY], relationships: [RelationshipType.DATING, RelationshipType.BEST_FRIENDS] },
  { text: "Life without you is like a broken pencil... pointless.", tones: [Tone.CHEESY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "Are you a camera? Because every time I look at you, I smile.", tones: [Tone.CHEESY], relationships: [RelationshipType.DATING, RelationshipType.CRUSH] },
  { text: "Is your name Google? Because you have everything I've been searching for.", tones: [Tone.CHEESY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "Are you French? Because Eiffel for you.", tones: [Tone.CHEESY, Tone.FUNNY], relationships: [RelationshipType.DATING, RelationshipType.CRUSH] },
  { text: "Do you believe in love at first sight, or should I walk by again?", tones: [Tone.CHEESY, Tone.FUNNY], relationships: [RelationshipType.CRUSH] },
  { text: "If you were a fruit, you'd be a fine-apple.", tones: [Tone.CHEESY, Tone.FUNNY], relationships: [RelationshipType.DATING, RelationshipType.CRUSH] },
  { text: "I'm no organ donor, but I'd give you my heart.", tones: [Tone.CHEESY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "Are you a time traveler? Because I see you in my future.", tones: [Tone.CHEESY], relationships: [RelationshipType.DATING, RelationshipType.CRUSH] },
  { text: "If kisses were snowflakes, I'd send you a blizzard.", tones: [Tone.CHEESY], relationships: [RelationshipType.DATING, RelationshipType.LONG_DISTANCE] },
  { text: "You must be tired because you've been running through my mind all day.", tones: [Tone.CHEESY], relationships: [RelationshipType.CRUSH, RelationshipType.DATING] },

  // --- SPICY ---
  { text: "You are my favorite distraction.", tones: [Tone.SPICY, Tone.ROMANTIC], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "I can't wait to be alone with you.", tones: [Tone.SPICY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "You're looking hot today. Just thought you should know.", tones: [Tone.SPICY, Tone.APPRECIATIVE], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "Every inch of you is perfect.", tones: [Tone.SPICY, Tone.ROMANTIC], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "Let's skip dinner and go straight to dessert.", tones: [Tone.SPICY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "You give me butterflies in places other than my stomach.", tones: [Tone.SPICY, Tone.FUNNY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "Thinking of you keeps me awake. Dreaming of you keeps me asleep. Being with you keeps me alive.", tones: [Tone.SPICY, Tone.ROMANTIC], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "I have big plans for us tonight.", tones: [Tone.SPICY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "You + Me + Tonight = 🔥", tones: [Tone.SPICY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "My favorite place is inside your hug.", tones: [Tone.SPICY, Tone.ROMANTIC], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "I want to be the reason you look down at your phone and smile. Then walk into a pole.", tones: [Tone.SPICY, Tone.FUNNY], relationships: [RelationshipType.DATING] },
  { text: "You're the only snack I need.", tones: [Tone.SPICY, Tone.FUNNY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "I promise to always be by your side. Or under you. Or on top.", tones: [Tone.SPICY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "You are the hottest thing that has ever been mine.", tones: [Tone.SPICY], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },

  // --- POETIC ---
  { text: "Whatever our souls are made of, yours and mine are the same.", tones: [Tone.POETIC, Tone.ROMANTIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "I seem to have loved you in numberless forms, numberless times, in life after life, in age after age forever.", tones: [Tone.POETIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "You are the poem I never knew how to write and this life is the story I have always wanted to tell.", tones: [Tone.POETIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "Your voice is my favorite sound.", tones: [Tone.POETIC, Tone.ROMANTIC], relationships: [RelationshipType.DATING, RelationshipType.MARRIED, RelationshipType.LONG_DISTANCE] },
  { text: "Love is not just looking at each other, it's looking in the same direction.", tones: [Tone.POETIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "You are my sun, my moon, and all my stars.", tones: [Tone.POETIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "With you, I am home.", tones: [Tone.POETIC, Tone.ROMANTIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING, RelationshipType.LONG_DISTANCE] },
  { text: "I love you past the moon and miss you beyond the stars.", tones: [Tone.POETIC], relationships: [RelationshipType.LONG_DISTANCE] },
  { text: "If I had a flower for every time I thought of you, I could walk through my garden forever.", tones: [Tone.POETIC, Tone.ROMANTIC], relationships: [RelationshipType.DATING, RelationshipType.MARRIED, RelationshipType.CRUSH] },
  { text: "We loved with a love that was more than love.", tones: [Tone.POETIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known.", tones: [Tone.POETIC, Tone.ROMANTIC], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "My soul saw you and kind of went, 'Oh, there you are. I've been looking for you.'", tones: [Tone.POETIC], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "To love is to burn, to be on fire.", tones: [Tone.POETIC], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "You pierced my soul. I am half agony, half hope.", tones: [Tone.POETIC], relationships: [RelationshipType.DATING, RelationshipType.CRUSH] },

  // --- LONG DISTANCE ---
  { text: "Distance gives us a reason to love harder.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.LONG_DISTANCE] },
  { text: "I carry your heart with me (I carry it in my heart).", tones: [Tone.POETIC, Tone.ROMANTIC], relationships: [RelationshipType.LONG_DISTANCE] },
  { text: "Close together or far apart, you're forever in my heart.", tones: [Tone.ROMANTIC, Tone.CHEESY], relationships: [RelationshipType.LONG_DISTANCE] },
  { text: "I miss you more than words can say. Counting down the days.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.LONG_DISTANCE] },
  { text: "The miles between us mean nothing because I love you here, there, and everywhere.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.LONG_DISTANCE] },
  { text: "My heart knows no distance when it comes to you.", tones: [Tone.ROMANTIC, Tone.POETIC], relationships: [RelationshipType.LONG_DISTANCE] },
  { text: "Sending you a virtual hug and a million kisses.", tones: [Tone.ROMANTIC, Tone.CHEESY], relationships: [RelationshipType.LONG_DISTANCE] },
  { text: "Even though we are miles apart, you are always in my thoughts.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.LONG_DISTANCE] },
  { text: "I wish I could teleport to you right now.", tones: [Tone.ROMANTIC, Tone.FUNNY], relationships: [RelationshipType.LONG_DISTANCE] },
  { text: "True love doesn't mean being inseparable; it means being separated and nothing changes.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.LONG_DISTANCE] },
  { text: "I'm jealous of the people who get to see you every day.", tones: [Tone.ROMANTIC, Tone.APPRECIATIVE], relationships: [RelationshipType.LONG_DISTANCE] },
  { text: "Together forever, never apart. Maybe in distance, but never in heart.", tones: [Tone.ROMANTIC, Tone.POETIC], relationships: [RelationshipType.LONG_DISTANCE] },
  
  // --- CRUSH ---
  { text: "I think you're pretty cool. Happy Valentine's Day!", tones: [Tone.CHEESY, Tone.FUNNY], relationships: [RelationshipType.CRUSH] },
  { text: "Just wanted to send a little love your way today.", tones: [Tone.ROMANTIC, Tone.APPRECIATIVE], relationships: [RelationshipType.CRUSH] },
  { text: "You make me smile more than anyone else.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.CRUSH] },
  { text: "I totally have a crush on you. There, I said it.", tones: [Tone.SPICY, Tone.FUNNY], relationships: [RelationshipType.CRUSH] },
  { text: "Hope your day is as amazing as you are.", tones: [Tone.APPRECIATIVE], relationships: [RelationshipType.CRUSH] },
  { text: "You're kinda my favorite person to stalk on Instagram.", tones: [Tone.FUNNY, Tone.SPICY], relationships: [RelationshipType.CRUSH] },
  { text: "I saved a seat for you in my future.", tones: [Tone.ROMANTIC, Tone.CHEESY], relationships: [RelationshipType.CRUSH] },
  { text: "Every time I see you, I fall a little bit more.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.CRUSH] },
  { text: "You have no idea how fast my heart beats when I see you.", tones: [Tone.ROMANTIC, Tone.SPICY], relationships: [RelationshipType.CRUSH] },
  { text: "Being near you is my favorite place to be.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.CRUSH] },
  { text: "I really like you. Like, a lot.", tones: [Tone.ROMANTIC, Tone.CHEESY], relationships: [RelationshipType.CRUSH] },
  { text: "Will you be my Valentine? (Please say yes!)", tones: [Tone.ROMANTIC], relationships: [RelationshipType.CRUSH] },
  
  // --- BEST FRIENDS ---
  { text: "Who needs a Valentine when I have a best friend like you?", tones: [Tone.FUNNY, Tone.APPRECIATIVE], relationships: [RelationshipType.BEST_FRIENDS] },
  { text: "Thanks for being my unbiological sibling.", tones: [Tone.FUNNY, Tone.APPRECIATIVE], relationships: [RelationshipType.BEST_FRIENDS] },
  { text: "Happy Valentine's Day to my partner in crime!", tones: [Tone.FUNNY], relationships: [RelationshipType.BEST_FRIENDS] },
  { text: "You're the best friend anyone could ask for.", tones: [Tone.APPRECIATIVE], relationships: [RelationshipType.BEST_FRIENDS] },
  { text: "Fries before guys. (Or whatever the equivalent is!)", tones: [Tone.FUNNY], relationships: [RelationshipType.BEST_FRIENDS] },
  { text: "Thanks for listening to my drama and still loving me.", tones: [Tone.APPRECIATIVE], relationships: [RelationshipType.BEST_FRIENDS] },
  { text: "You're my person.", tones: [Tone.ROMANTIC, Tone.APPRECIATIVE], relationships: [RelationshipType.BEST_FRIENDS, RelationshipType.MARRIED] },
  { text: "Happy V-Day to the one who knows too much about me.", tones: [Tone.FUNNY], relationships: [RelationshipType.BEST_FRIENDS] },
  { text: "Love you to the moon and back, bestie.", tones: [Tone.APPRECIATIVE], relationships: [RelationshipType.BEST_FRIENDS] },
  { text: "Single or taken, you'll always be my Valentine.", tones: [Tone.APPRECIATIVE], relationships: [RelationshipType.BEST_FRIENDS] },
  { text: "Thanks for being the cheapest therapist I know.", tones: [Tone.FUNNY], relationships: [RelationshipType.BEST_FRIENDS] },

  // --- APPRECIATIVE ---
  { text: "Thank you for being the reason I smile.", tones: [Tone.APPRECIATIVE, Tone.ROMANTIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "I appreciate you more than you'll ever know.", tones: [Tone.APPRECIATIVE], relationships: [RelationshipType.MARRIED, RelationshipType.DATING, RelationshipType.BEST_FRIENDS] },
  { text: "You make life so much sweeter.", tones: [Tone.APPRECIATIVE, Tone.ROMANTIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "Thank you for loving me when I'm not lovable.", tones: [Tone.APPRECIATIVE], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "I am so incredibly lucky to have you in my life.", tones: [Tone.APPRECIATIVE], relationships: [RelationshipType.MARRIED, RelationshipType.DATING, RelationshipType.BEST_FRIENDS] },
  { text: "You make the world a better place just by being in it.", tones: [Tone.APPRECIATIVE], relationships: [RelationshipType.MARRIED, RelationshipType.DATING, RelationshipType.BEST_FRIENDS] },
  { text: "Thank you for standing by my side.", tones: [Tone.APPRECIATIVE], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "I don't know what I'd do without you.", tones: [Tone.APPRECIATIVE], relationships: [RelationshipType.MARRIED, RelationshipType.DATING, RelationshipType.BEST_FRIENDS] },
  { text: "Your support means everything to me.", tones: [Tone.APPRECIATIVE], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "Here's to you and all the joy you bring.", tones: [Tone.APPRECIATIVE], relationships: [RelationshipType.MARRIED, RelationshipType.DATING, RelationshipType.BEST_FRIENDS] },
  { text: "Your kindness is my favorite thing about you.", tones: [Tone.APPRECIATIVE, Tone.ROMANTIC], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "You have the most beautiful soul.", tones: [Tone.APPRECIATIVE], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },

  // --- GENERAL / MIXED ---
  { text: "You mean the world to me.", tones: [Tone.ROMANTIC, Tone.APPRECIATIVE], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "Loving you is the easiest thing I've ever done.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "I'm so happy we found each other.", tones: [Tone.ROMANTIC, Tone.APPRECIATIVE], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "You are my heart's desire.", tones: [Tone.ROMANTIC, Tone.POETIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "You complete me.", tones: [Tone.ROMANTIC, Tone.CHEESY], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "Happy Valentine's Day to the love of my life.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "You're my spark in the dark.", tones: [Tone.POETIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "I love you to infinity and beyond.", tones: [Tone.ROMANTIC, Tone.CHEESY], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "You make my heart skip a beat.", tones: [Tone.ROMANTIC, Tone.CHEESY], relationships: [RelationshipType.MARRIED, RelationshipType.DATING, RelationshipType.CRUSH] },
  { text: "I'm so lucky to call you mine.", tones: [Tone.ROMANTIC, Tone.APPRECIATIVE], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "Life is better with you by my side.", tones: [Tone.ROMANTIC, Tone.APPRECIATIVE], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "You are my best friend and my soulmate.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "I love you more than yesterday, but less than tomorrow.", tones: [Tone.POETIC, Tone.ROMANTIC], relationships: [RelationshipType.MARRIED, RelationshipType.DATING] },
  { text: "You're the one I've been waiting for.", tones: [Tone.ROMANTIC], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] },
  { text: "I adore you.", tones: [Tone.ROMANTIC, Tone.APPRECIATIVE], relationships: [RelationshipType.DATING, RelationshipType.MARRIED] }
];

export const generateValentineWish = async (
  data: WishFormData,
  onStreamUpdate: (text: string) => void
): Promise<string> => {
  const { tone, relationship, details } = data;

  // 1. Filter by Tone
  let candidates = WISHES.filter(w => w.tones.includes(tone));
  
  // 2. Filter by Relationship (if any match)
  const relationshipMatches = candidates.filter(w => w.relationships.includes(relationship));
  
  if (relationshipMatches.length > 0) {
    candidates = relationshipMatches;
  } else {
    // If no exact tone+relationship match, try matching just relationship from the whole pool
    const backupRelationshipMatches = WISHES.filter(w => w.relationships.includes(relationship));
    if (backupRelationshipMatches.length > 0 && candidates.length === 0) {
      candidates = backupRelationshipMatches;
    }
  }

  // 3. Fallback if empty
  if (candidates.length === 0) {
    candidates = WISHES; // Pick anything if filters fail completely (unlikely)
  }

  // 4. Select Random
  const randomIndex = Math.floor(Math.random() * candidates.length);
  let selectedWish = candidates[randomIndex].text;

  // 5. Basic Detail Injection (Simple Logic)
  // If details are provided, we can't truly "incorporate" them without AI, 
  // but we can append a custom note if it looks short enough.
  if (details && details.length < 50 && details.trim().length > 0) {
     // A simple heuristic: if it doesn't end with punctuation, add a dot.
     if (!/[.!?]$/.test(selectedWish)) selectedWish += ".";
     selectedWish += ` P.S. ${details}`;
  }

  // Simulate "Thinking" delay and streaming
  await simulateTyping(selectedWish, onStreamUpdate);
  
  return selectedWish;
};
    