export interface FoodCommittee {
  people: string[];
}

const committee1: FoodCommittee = {
  people: ["Kristina", "Brooke", "Jodi", "Claire", "Heidi", "Taryn", "Julia"],
};

const committee2: FoodCommittee = {
  people: ["Plough girls house", "Menahga girls house", "Hannah & Avery"],
};

const committee3: FoodCommittee = {
  people: ["Haps Guys"],
};

const committee4: FoodCommittee = {
  people: [
    "Wyatt & Kendra",
    "Jake & Suzanne",
    "Nathan & Marae",
    "Joel & Rebecca",
  ],
};

const committee5: FoodCommittee = {
  people: ["Nate & Kate", "Sean & Mandy", "Brook & Jeremy", "Chad & Sarah"],
};

const committee6: FoodCommittee = {
  people: ["Eric & Janell", "Bryce & Emily", "Cody & Briana"],
};

const committee7: FoodCommittee = {
  people: ["Trav & Hayley", "Quincy & Nora", "Kenton & Katie", "Jon & Hanna"],
};

export const foodCommitteeByDate: Record<string, FoodCommittee> = {
  "2024-01-07": committee1,
  "2024-01-28": committee2,
  "2024-02-25": committee3,
  "2024-03-21": committee4,
  "2024-04-21": committee5,
};
