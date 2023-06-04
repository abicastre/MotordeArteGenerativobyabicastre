const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');

let layerConfigurations = [];
let layerDirectories = [];
let allCreatedCombinations = [];

async function setupLayerOrder(layersDir, outputDir) {
  const subdirectories = fs.readdirSync(layersDir, { withFileTypes: true })
    .filter(dirEnt => dirEnt.isDirectory())
    .map(dirEnt => dirEnt.name);

  console.log("Subcarpetas encontradas: ", subdirectories);

  for (let i = 0; i < subdirectories.length; i++) {
    const subdir = subdirectories[i];
    const answer = await inquirer.prompt([
      {
        name: "order",
        message: `La capa "${subdir}" es la número:`,
        validate: function (value) {
          var valid = !isNaN(parseFloat(value));
          return valid || 'Por favor ingrese un número';
        },
        filter: Number
      }
    ]);

    layerConfigurations[answer.order - 1] = subdir;
    layerDirectories[answer.order - 1] = path.join(layersDir, subdir);
  }

  const orderedConfigurations = Object.keys(layerConfigurations).map(i => layerConfigurations[i]);

  console.log("Orden de capas configurado: ", orderedConfigurations);
}

function generateMetadata(combination, dir, edition) {
  let dateTime = Date.now();
  let tempMetadata = {
    name: `Motor Arte Generativo Fisico by abicastre #${edition}`,
    description: "Motor de Arte Generativo Fisico pero hechos por computadora.",
    image: `images/${edition}.png`,
    edition,
    date: dateTime,
    attributes: [],
    compiler: "Motor Arte Generativo by abicastre"
  };

  let hashString = "1";
  for (let i = 0; i < combination.length; i++) {
    let layer = layerConfigurations[i];
    let element = combination[i];
    let elementValue = element.split('.').slice(0, -1).join('.');
    
    tempMetadata.attributes.push({
      trait_type: layer,
      value: elementValue
    });

    hashString += element.toString();
  }

  tempMetadata.hash = hashString;

  let metadataFilename = path.join(dir, 'json', `${edition}.json`);
  fs.writeFileSync(metadataFilename, JSON.stringify(tempMetadata, null, 2));
  return tempMetadata;
}

async function generateArt(dir, startNumber, endNumber) {
  const imageCombinations = [];
  const imageMetadata = [];
  const metadataOutput = path.join(dir, 'json', '_metadata.json');

  for (const layerDir of layerDirectories) {
    const elements = fs.readdirSync(layerDir);
    imageCombinations.push(elements);
  }

  const totalCombinations = imageCombinations.reduce((total, arr) => total * arr.length, 1);
  console.log(`Se generarán ${totalCombinations} combinaciones de imágenes.`);

  let count = startNumber;

  for (const combination of generateCombinations(imageCombinations, startNumber, endNumber)) {
    console.log(`Generando combinación ${count} de ${totalCombinations}`);

    const metadata = generateMetadata(combination, dir, count);
    imageMetadata.push(metadata);

    let image = null;
    for (let i = 0; i < combination.length; i++) {
      let layer = layerDirectories[i];
      let element = combination[i];
      let elementPath = path.join(layer, element);
      let loadedElement = await jimp.read(elementPath);

      if (image === null) {
        image = loadedElement;
      } else {
        image.composite(loadedElement, 0, 0, {
          mode: jimp.BLEND_SOURCE_OVER,
          opacityDest: 1,
          opacitySource: 1
        });
      }
    }

    await image.writeAsync(path.join(dir, 'images', `${count}.png`));

    count++;
    if (count > endNumber) {
      console.log(`Alcanzado el límite de ediciones (${endNumber}). Finalizando el proceso.`);
      break;
    }
  }

  fs.writeFileSync(metadataOutput, JSON.stringify(imageMetadata, null, 2));
}

function generateCombinations(arrays, startNumber, endNumber) {
  const lengths = arrays.map(arr => arr.length);
  const totalCombinations = lengths.reduce((total, len) => total * len, 1);

  if (startNumber < 1 || endNumber > totalCombinations) {
    console.log('El rango especificado está fuera de los límites de las combinaciones posibles.');
    console.log(`El rango válido es de 1 a ${totalCombinations}`);
    return [];
  }

  return {
    *[Symbol.iterator]() {
      let count = 1;
      let indices = new Array(arrays.length).fill(0);

      while (count <= endNumber) {
        if (count >= startNumber) {
          yield arrays.map((arr, i) => arr[indices[i]]);
        }

        count++;

        for (let i = indices.length - 1; i >= 0; i--) {
          indices[i]++;
          if (indices[i] === lengths[i]) {
            indices[i] = 0;
          } else {
            break;
          }
        }
      }
    }
  };
}

async function run() {
  const layersDir = await inquirer.prompt([
    {
      name: 'layersDir',
      message: 'Ingrese la carpeta de entrada (layers):'
    }
  ]);

  const outputDir = await inquirer.prompt([
    {
      name: 'outputDir',
      message: 'Ingrese la carpeta de salida:'
    }
  ]);

  const startNumber = await inquirer.prompt([
    {
      name: 'startNumber',
      message: 'Ingrese el número inicial:'
    }
  ]);

  const endNumber = await inquirer.prompt([
    {
      name: 'endNumber',
      message: 'Ingrese el número final:'
    }
  ]);

  const imagesDir = path.join(outputDir.outputDir, 'images');
  const jsonDir = path.join(outputDir.outputDir, 'json');

  fs.mkdirSync(imagesDir, { recursive: true });
  fs.mkdirSync(jsonDir, { recursive: true });

  await setupLayerOrder(layersDir.layersDir, outputDir.outputDir);
  await generateArt(outputDir.outputDir, startNumber.startNumber, endNumber.endNumber);
}

run();
