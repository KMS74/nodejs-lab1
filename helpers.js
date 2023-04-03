const fs = require("fs");
const filePath = "db.json";
(function checkFileDB() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([{ id: 0 }]));
  }
})();

let dataBaseFile = fs.readFileSync(filePath, "utf-8");
dataBaseFile = JSON.parse(dataBaseFile);
function add(data) {
  let id = dataBaseFile[dataBaseFile.length - 1].id + 1;
  let options = getOptionsObj(data);
  let mainData = { id, ...options, checked: false };
  dataBaseFile.push(mainData);
  fs.writeFileSync(filePath, JSON.stringify(dataBaseFile));
}

function edit(data) {
  let options = getOptionsObj(data);
  newData = dataBaseFile.filter((element) => {
    if (element.id == options.id) {
      element.title = options.title;
      element.body = options.body;
      return element;
    }
    return element;
  });
  fs.writeFileSync(filePath, JSON.stringify(newData));
}
function remove(data) {
  let options = getOptionsObj(data);
  dataBaseFile = dataBaseFile.filter((element) => element.id != options.id);
  fs.writeFileSync(filePath, JSON.stringify(dataBaseFile));
}
function list(data) {
  switch (data[0]) {
    case "all":
      console.log(JSON.stringify(dataBaseFile));
      break;
    case "checked":
      dataBaseFile = dataBaseFile.filter((element) => element.checked === true);
      console.log(JSON.stringify(dataBaseFile));
      break;
    case "unchecked":
      dataBaseFile = dataBaseFile.filter((elem) => elem.checked === false);
      console.log(JSON.stringify(dataBaseFile));
      break;
    default:
      break;
  }
}
function check(data) {
  let options = getOptionsObj(data);
  dataBaseFile = dataBaseFile.filter((element) =>
    element.id == options.id ? (element.checked = true) : element
  );
  fs.writeFileSync(filePath, JSON.stringify(dataBaseFile));
}
function uncheck(data) {
  let options = getOptionsObj(data);
  dataBaseFile = dataBaseFile.filter((element) => {
    if (element.id == options.id) {
      element.checked = false;
      return element;
    }
    return element;
  });
  fs.writeFileSync(filePath, JSON.stringify(dataBaseFile));
}
function getOptionsObj(data) {
  let options = data.reduce((previous, element) => {
    let [key, value] = element.split("=");
    previous[key] = value;
    return previous;
  }, {});
  return options;
}

module.exports = { add, edit, remove, list, check, uncheck };
