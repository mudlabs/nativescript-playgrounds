const fs = require("fs");
const utils = require("../utils");

(async function() {
  const options = { encoding: "utf-8" };
  const current_readme = await fs.promises.readFile("./README.md", options)
  const projects_dir = await fs.promises.readdir("projects", options);
  const list_regexp = new RegExp(/(- \[(?:\w|\s)+\]\(projects\/(?:\w|\%|\d)+\)\n)+/, "gim");
  
  const list = projects_dir.reduce((prev, curr) => {
    const curr_urlified = curr.replace(/( )/g, "%20");
    return prev + `- [${curr}](projects/curr_urlified)\n`
  }, "");
  const new_readme = current_readme.replace(list_regexp, list);

  await fs.promises.writeFile("./README.md", new_readme);
})()