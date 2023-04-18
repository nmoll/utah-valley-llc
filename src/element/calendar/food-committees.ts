export interface FoodCommittee {
  people: string[];
}

const committee1: FoodCommittee = {
  people: ["Hall girls house", "Maria & Claire", "Taryn & Julia", "Kenzie"],
};

const committee2: FoodCommittee = {
  people: ["Plough girls house", "Menahga girls house", "Hannah & Avery"],
};

// const committee3: FoodCommittee = {
//   people: ["Haps Guys"],
// };

// const committe4: FoodCommittee = {
//   people: ["Nate & Kate", "Sean & Mandy", "Brook & Jeremy", "Chad & Sarah"],
// };

// const committe5: FoodCommittee = {
//   people: ['Eric & Janell', 'Bryce & Emily', 'Cody & Briana']
// }

// const committe6: FoodCommittee = {
//   people: ["Trav & Hayley", "Quincy & Nora", "Kenton & Katie"],
// };

// const committee7: FoodCommittee = {
//   people: ["Wyatt & Kendra", "Jake & Suzanne", "Nathan & Marae", "Joel & Rebecca"],
// };

export const foodCommitteeByDate: Record<string, FoodCommittee> = {
  "2023-04-23": committee1,
  "2023-05-21": committee2,
};
