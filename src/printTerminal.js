import readline from "readline";
import chalk from "chalk";
import chalkTable from "chalk-table";
import DraftLog from "draftlog";
import Person from "./person.js";

export default class PrintTerminal {
  constructor(input, output) {
    this._rd = readline.createInterface({ input, output });
  }

  initialTable(data) {
    DraftLog(console).addLineListener(process.stdin);
    const dataFormat = data.map((obj) => new Person(obj).formatted());
    console.log(dataFormat);
    let table = chalkTable(this.getTableOptions(), dataFormat);

    const print = console.draft(table);
  }

  questionInput(stringName) {
    return new Promise((resolve, reject) => {
      try {
        this._rd.question(stringName, (value) => resolve(value));
      } catch (error) {
        reject(error);
      }
    });
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        {
          field: "id",
          name: chalk.cyan("ID"),
        },
        {
          field: "vehicles",
          name: chalk.magenta("Vehicles"),
        },
        {
          field: "kmTraveled",
          name: chalk.cyan("Km Traveled"),
        },
        {
          field: "from",
          name: chalk.cyan("From"),
        },
        {
          field: "to",
          name: chalk.magenta("To"),
        },
      ],
    };
  }

  async printerOutQuestion() {
    const question = await this.questionInput("Quais os seus veículos?");
    const km = await this.questionInput("Qual a quilometragem?");
    const from = new Date().toISOString().slice(0, 10);
    const to = await this.questionInput("Até quando?");

    return {
      question,
      km,
      from,
      to,
    };
  }
}
