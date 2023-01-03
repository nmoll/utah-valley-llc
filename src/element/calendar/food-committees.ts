export interface FoodCommittee {
  people: string[];
}

// const committee1: FoodCommittee = {
//   people: ["Haps Girls",]
// };

const committee2: FoodCommittee = {
  people: ["Haps Guys"],
};

const committe3: FoodCommittee = {
  people: ["Nate & Kate", "Sean & Mandy", "Brook & Jeremy"],
};

// const committe4: FoodCommittee = {
//   people: ['Eric & Janell', 'Bryce & Emily', 'Cody & Briana']
// }

const committe5: FoodCommittee = {
  people: ["Trav & Hayley", "Quincy & Nora", "Kenton & Katie"],
};

export const foodCommitteeByDate: Record<string, FoodCommittee> = {
  "2022-10-16": committee2,
  "2022-11-13": committe3,
  "2023-01-08": committe5,
};
