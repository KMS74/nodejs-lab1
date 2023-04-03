const helpers = require("./helpers");

function main(args) {
  let [, , operation, ...options] = args;
  switch (operation) {
    case "add":
      helpers.add(options);
      break;
    case "edit":
      helpers.edit(options);
      break;
    case "delete":
      helpers.remove(options);
      break;
    case "list":
      helpers.list(options);
      break;
    case "check":
      helpers.check(options);
      break;
    case "uncheck":
      helpers.uncheck(options);
      break;
    default:
      break;
  }
}
main(process.argv);
// console.log(process.argv);
// node index.js add title=ahmed body=body_text
// node index.js edit id=1 title=ahmed body=test
// node index.js delete id=1
// node index.js list all
// node index.js check id=1 
// node index.js uncheck id=1 
