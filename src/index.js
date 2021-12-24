import chalkTable from "chalk-table";
import PrintTerminal from "./printTerminal.js";
import data from "./database.json";
import { stdin as input, stdout as output } from "process";
import Person from "./person.js";
const printer = new PrintTerminal(input, output);

printer.initialTable(data);
const questionsFunction = async () => {
  let questions = await printer.printerOutQuestion();

  const splitQuestion = questions.question.split(",");

  const newData = {
    id: data.length + 1,
    vehicles: splitQuestion,
    kmTraveled: questions.km,
    to: questions.to,
    from: questions.from,
  };

  if (!Object.values(newData).includes("")) data.push(newData);

  const dataFormat = data.map((obj) => new Person(obj).formatted());
  const table = chalkTable(printer.getTableOptions(), dataFormat);

  console.draft(table);

  const newProcess = await printer.questionInput(
    "Deseja adicionar mais um item?"
  );

  if (newProcess == ":q") {
    printer._rd.close();
    return;
  }

  questionsFunction();
};

(async () => {
  await questionsFunction();
})();
