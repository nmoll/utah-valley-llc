import { Member } from "../model/member";
import { createMember } from "./create-member";

export const hosts: Member[] = [
  createMember("Kenton & Katie", "2022-03-01"),
  createMember("Nate & Kate", "2022-03-01", {
    inactive: [
      {
        start: "2022-03-01",
        end: "2022-04-01",
      },
    ],
  }),
  createMember("Trav & Hayley", "2022-03-01"),
  createMember("Bryce & Emily", "2022-03-01"),
  createMember("Eric & Janell", "2022-03-01"),
  createMember("Draper Guys", "2022-03-01"),
  createMember("Matt, Chad, Alan", "2022-03-01"),
  createMember("Quincy & Nora", "2022-03-01"),
  createMember("Cody & Briana", "2022-03-01"),
];
