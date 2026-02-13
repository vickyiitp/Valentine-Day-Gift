export enum Tone {
  ROMANTIC = 'Romantic',
  FUNNY = 'Funny',
  POETIC = 'Poetic',
  SPICY = 'Spicy',
  CHEESY = 'Cheesy',
  APPRECIATIVE = 'Appreciative'
}

export enum RelationshipType {
  DATING = 'Dating',
  MARRIED = 'Married',
  CRUSH = 'Crush',
  LONG_DISTANCE = 'Long Distance',
  BEST_FRIENDS = 'Best Friends'
}

export interface SpecialLink {
  id: string;
  label: string;
  url: string;
}

export interface WishFormData {
  senderName: string;
  receiverName: string;
  relationship: RelationshipType;
  tone: Tone;
  details: string;
  // New fields for the full website gift
  promises: string[];
  images: string[]; // Base64 strings
  selectedGift: string; // Emoji representing the main gift
  links: SpecialLink[];
}

export interface WishResult {
  message: string;
  themeColor: string;
}