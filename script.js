// var data = "";

// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// let medicineName = "paracetamol";

// const search = document.querySelector(".search");

// // search.style = `
// //                 width:50rem;
// //                 padding:.5rem 1rem;
// // `;

// xhr.addEventListener("readystatechange", function () {
//   //   console.log(this);
//   if (this.readyState === 4) {
//     // console.log(this.responseText);
//     // const obj = JSON.parse(this.responseText);

//     console.log(Hello);

//     let variable = typeMap;
//     for (let [key, value] of Object.entries(variable)) {
//       console.log(key, value);
//       if (key === "Name") {
//         console.log(variable[key].includes("Paracetamol") ? "Hello" : "Bye");
//       }
//     }
//     console.log(typeof variable);
//   }
// });

// xhr.open(
//   "GET",
//   `https://www.healthos.co/api/v1/search/medicines/brands?page=1&size=10`
// );

// // xhr.responseType = "json";

// xhr.onload = function () {
//   const medicine = xhr.response;
//   console.log(`hello`);
// };

// xhr.setRequestHeader(
//   "Authorization",
//   "Bearer 46bb7528a6ac8f40e673e3e0163c8331d1ad2ea806a4311bfc7a56d0b7047029"
// );

// xhr.send(data);

var data = "";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    // console.log(this.responseText);
    console.log(this.responseURL);
  }
});

xhr.open(
  "GET",
  `https://www.healthos.co/api/v1/medicines/brands?page=1&size=100`
);

xhr.onload = function () {
  const medicine = xhr.response;
  //   console.log(`hello`);
  const obj = JSON.parse(this.responseText);
  //   console.log(obj);

  //   while (xhr.response) console.log(medicine);
  medicineData(obj);
};

xhr.setRequestHeader(
  "Authorization",
  "Bearer 698faf99010cdff627b0db4865be729f5d8b7c2b39ee0900cb0196f06d4b9e78"
);

xhr.send(data);

const containerMain = document.querySelector(".container__main");

function medicineData(medicine) {
  containerMain.innerHTML = "";

  //   console.log("hello");

  for (let [key, value] of Object.entries(medicine)) {
    // console.log(key, value);

    const containerCard = document.createElement("div");

    containerCard.style.backgroundColor = generateLightColorHex();

    containerCard.classList.add("container-card");

    const name = value.name;
    const manufacturer = value.manufacturer;
    const form = value.form;
    const packageForm = value.packageForm;
    const price = value.price;
    const constituents = new Array();
    for (let [k, v] of Object.entries(value.constituents)) {
      constituents.push(v.name);
    }
    const string = [...constituents].join(", ");
    // console.log(string);

    const html = `
    <h3 class="heading">${name}</h3>

    <ul class="data">
      <li><span>form</span> : ${form}</li>
      <li><span>manufacturer</span> : ${manufacturer} </li>
      <li><span>constituents</span> : ${string}</li>
      <li><span>packageForm</span> : ${packageForm}</li>
      <li><span>price</span> : ${price}Rs.</li>
    </ul>
    `;

    containerCard.insertAdjacentHTML("beforeend", html);

    containerMain.appendChild(containerCard);
  }
}

function generateLightColorHex() {
  let color = "#";
  for (let i = 0; i < 3; i++)
    color += (
      "0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)
    ).slice(-2);
  return color;
}

document.getElementById("fname").addEventListener("input", function (e) {
  //   console.log(e);

  let x = document.getElementById("fname").value;
  //   console.log(x);
});

let y = document.getElementById("fname"),
  x = "";

document.getElementById("fname").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    x = document.getElementById("fname").value;
    e.preventDefault();
    let element = x;
    console.log(x);

    var data = "";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseURL);
      }
    });

    xhr.open(
      "GET",
      `https://www.healthos.co/api/v1/search/medicines/brands/${x}`
    );

    xhr.setRequestHeader(
      "Authorization",
      "Bearer 698faf99010cdff627b0db4865be729f5d8b7c2b39ee0900cb0196f06d4b9e78"
    );

    xhr.send(data);

    y.value = "";
  }

  x = document.getElementById("fname").value;
});

// To parse this data:
//
//   const Convert = require("./file");
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
function toWelcome(json) {
  return cast(JSON.parse(json), a(r("Welcome")));
}

function welcomeToJson(value) {
  return JSON.stringify(uncast(value, a(r("Welcome"))), null, 2);
}

function invalidValue(typ, val, key = "") {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${JSON.stringify(
        typ
      )} but got ${JSON.stringify(val)}`
    );
  }
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`
  );
}

function jsonToJSProps(typ) {
  if (typ.jsonToJS === undefined) {
    const map = {};
    typ.props.forEach((p) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ) {
  if (typ.jsToJSON === undefined) {
    const map = {};
    typ.props.forEach((p) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val, typ, getProps, key = "") {
  function transformPrimitive(typ, val) {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs, val) {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases, val) {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ, val) {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue("array", val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val) {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue("Date", val);
    }
    return d;
  }

  function transformObject(props, additional, val) {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue("object", val);
    }
    const result = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === "object" && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast(val, typ) {
  return transform(val, typ, jsonToJSProps);
}

function uncast(val, typ) {
  return transform(val, typ, jsToJSONProps);
}

function a(typ) {
  return { arrayItems: typ };
}

function u(...typs) {
  return { unionMembers: typs };
}

function o(props, additional) {
  return { props, additional };
}

function m(additional) {
  return { props: [], additional };
}

function r(name) {
  return { ref: name };
}

const typeMap = {
  Welcome: new Array(
    [
      { json: "name", js: "name", typ: "" },
      { json: "form", js: "form", typ: "" },
      { json: "standardUnits", js: "standardUnits", typ: 0 },
      { json: "packageForm", js: "packageForm", typ: "" },
      { json: "price", js: "price", typ: 3.14 },
      { json: "size", js: "size", typ: "" },
      { json: "manufacturer", js: "manufacturer", typ: "" },
      { json: "constituents", js: "constituents", typ: a(r("Constituent")) },
      { json: "schedule", js: "schedule", typ: r("Schedule") },
      { json: "medicine_id", js: "medicine_id", typ: "" },
      { json: "id", js: "id", typ: "" },
      { json: "search_score", js: "search_score", typ: 3.14 },
    ],
    false
  ),
  Constituent: o(
    [
      { json: "name", js: "name", typ: r("Name") },
      { json: "strength", js: "strength", typ: "" },
    ],
    false
  ),
  Schedule: o(
    [
      { json: "category", js: "category", typ: r("Category") },
      { json: "label", js: "label", typ: r("Label") },
    ],
    false
  ),
  Name: ["Aceclofenac", "Paracetamol"],
  Category: ["OTC"],
  Label: ["It can be sold without a prescription"],
};
