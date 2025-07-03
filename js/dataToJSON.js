function initialIsCapital(word) {
  return word[0] !== word[0].toLowerCase();
}

let result = "";

const tableRows = [];
for (let item of $("tbody").children) {
  if (
    item.firstChild.innerHTML !==
    '<a target="text" href="../format.html#col-num">№</a>'
  ) {
    tableRows.push(item);
  }
}

const tableCells = [];
for (let item of tableRows) {
  tableCells.push(item.cells);
}

let codePointToName = [];
let nameToBase64 = [];
for (let item of tableCells) {
  let cells = [];
  let imageSource = "";
  for (let elem of item) {
    if (
      elem.innerText !== "" &&
      elem.innerText !== "—" &&
      elem.innerText !== "…  …"
    ) {
      let buffer = elem.innerText;
      buffer = buffer.replace("⊛ ", "");
      cells.push(buffer);
    }
    // Grab the base64 source from the img tag if it exists
    if (
      elem.firstChild &&
      elem.firstChild.tagName === "IMG" &&
      elem.firstChild.hasAttribute("src") &&
      elem.firstChild.getAttribute("src").startsWith("data:image/") &&
      elem.firstChild.className === "imga"
    ) {
      const imgSrc = elem.firstChild.getAttribute("src");
      if (imgSrc) {
        imageSource = imgSrc;
      }
    }
  }
  if (cells[3] !== undefined) {
    if (cells[1].split(" ").length > 1) {
      cells[1] = cells[1].replaceAll(" ", "-");
    }
    codePointToName.push(
      `    "${cells[1].replaceAll("U+", "")}": "${cells[3]}",`,
    );
    nameToBase64.push(`    "${cells[3]}": "${imageSource}",`);
  }
}

// remove the last comma
codePointToName[codePointToName.length - 1] = codePointToName[
  codePointToName.length - 1
].slice(0, -1);
nameToBase64[nameToBase64.length - 1] = nameToBase64[
  nameToBase64.length - 1
].slice(0, -1);

result += `{\n  "codePointToName": {\n${codePointToName.join("\n")}\n  },\n`;
result += `  "nameToBase64": {\n${nameToBase64.join("\n")}\n  }\n}`;

console.log(result);
