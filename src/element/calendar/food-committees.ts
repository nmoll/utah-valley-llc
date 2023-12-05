export interface FoodCommittee {
  people: string[];
}

const committee1: FoodCommittee = {
  people: ["Hall girls house", "Maria & Claire", "Taryn & Julia"],
};

const committee2: FoodCommittee = {
  people: ["Plough girls house", "Menahga girls house", "Hannah & Avery"],
};

const committee3: FoodCommittee = {
  people: ["Haps Guys"],
};

const committee4: FoodCommittee = {
  people: ["Nate & Kate", "Sean & Mandy", "Brook & Jeremy", "Chad & Sarah"],
};

const committee5: FoodCommittee = {
  people: ["Eric & Janell", "Bryce & Emily", "Cody & Briana"],
};

const committee6: FoodCommittee = {
  people: ["Trav & Hayley", "Quincy & Nora", "Kenton & Katie", "Jon & Hanna"],
};

const committee7: FoodCommittee = {
  people: [
    "Wyatt & Kendra",
    "Jake & Suzanne",
    "Nathan & Marae",
    "Joel & Rebecca",
  ],
};

export const foodCommitteeByDate: Record<string, FoodCommittee> = {
  "2023-04-23": committee1,
  "2023-05-21": committee2,
  "2023-06-11": committee3,
  "2023-08-27": committee4,
  "2023-10-08": committee5,
  "2023-11-12": committee6,
  "2023-12-10": committee7,
};
