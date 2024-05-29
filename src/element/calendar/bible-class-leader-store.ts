interface SpreadsheetResponse {
  values: string[][];
}

const sheetsApiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

export class BibleClassLeaderStore {
  async getBibleClassLeaders(): Promise<Record<string, string>> {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/1acLrliJ6GANqTUHPHodJ4qsz3Y-p2PV84C4t1bUQ3E4/values/Sheet1!A:B?key=${sheetsApiKey}`
      );
      const data: SpreadsheetResponse = await response.json();
      const result = data.values.reduce(
        (res, row) => ({
          ...res,
          [row[0]]: row[1],
        }),
        {}
      );
      return result;
    } catch (e) {
      console.error("error getting bible class leaders:", e);
      return {};
    }
  }
}
