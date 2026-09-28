export type DietaryPreference =
  | 'gluten-free'
  | 'gluten-free-available'
  | 'vegetarian'
  | 'vegan'
  | 'nut-free'
  | 'dairy-free';

export type Allergen =
  | 'gluten'
  | 'dairy'
  | 'nuts'
  | 'shellfish'
  | 'egg'
  | 'soy';

export type MenuCategory =
  | 'all'
  | 'pizza'
  | 'pasta'
  | 'antipasti'
  | 'insalata'
  | 'secondi'
  | 'dolci-cocktails';

export interface MenuItem {
  id: string;
  name: string;
  category: 'pizza' | 'pasta' | 'antipasti' | 'insalata' | 'secondi' | 'dolci-cocktails';
  price: number;
  description: string;
  ingredients: string[];
  isGlutenFree: boolean;
  glutenFreeAvailable: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  allergens: Allergen[];
  allergenNote?: string;
  popular?: boolean;
  signature?: boolean;
  image?: string;
  pizzaOptions?: {
    supportsHalfAndHalf?: boolean;
    supportsSicilian?: boolean;
    sicilianPrice?: number;
  };
}

export interface ReviewItem {
  id: string;
  author: string;
  badge?: string;
  rating: number;
  date: string;
  content: string;
  highlightDish?: string;
  ownerResponse?: {
    date: string;
    text: string;
  };
  likesCount: number;
  tags: string[];
}

export interface ReservationData {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  seatingArea: 'main-dining' | 'window' | 'bar-counter' | 'chefs-corner';
  dietaryNotes?: string;
  specialOccasion?: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}
