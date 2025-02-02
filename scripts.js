// Global ölçüler
const width = 1120,
      height = 500;

// Kapsamlı ISO 3166-1 Numeric → ISO Alpha-3 eşleme tablosu
const numericToAlpha3 = {
  "004": "AFG", "008": "ALB", "012": "DZA", "016": "ASM", "020": "AND",
  "024": "AGO", "010": "ATA", "028": "ATG", "032": "ARG", "051": "ARM",
  "533": "ABW", "036": "AUS", "040": "AUT", "031": "AZE", "044": "BHS",
  "048": "BHR", "050": "BGD", "052": "BRB", "056": "BEL", "084": "BLZ",
  "060": "BMU", "064": "BTN", "068": "BOL", "070": "BIH", "072": "BWA",
  "074": "BVT", "076": "BRA", "086": "BRN", "100": "BGR", "116": "CMR",
  "120": "CAN", "132": "CYM", "136": "CAF", "140": "TCD", "148": "CHL",
  "152": "CHL", "156": "CHN", "162": "CXR", "166": "CCK", "170": "COL",
  "174": "COM", "178": "COG", "180": "COD", "184": "COK", "188": "CRI",
  "191": "HRV", "192": "CUB", "196": "CYP", "203": "CZE", "384": "CIV",
  "208": "DNK", "212": "DMA", "214": "DOM", "218": "ECU", "222": "SLV",
  "226": "GNQ", "231": "ERI", "233": "EST", "234": "ETH", "238": "FLK",
  "242": "FJI", "246": "FIN", "250": "FRA", "254": "GUF", "258": "PYF",
  "260": "ATF", "262": "DJI", "266": "GAB", "270": "GMB", "268": "GEO",
  "276": "DEU", "288": "GHA", "292": "GIB", "296": "KIR", "300": "GRC",
  "304": "GRL", "308": "GRD", "312": "GLP", "316": "GUM", "320": "GTM",
  "324": "GIN", "328": "GNB", "332": "GUY", "336": "HTI", "340": "HMD",
  "344": "VAT", "348": "HND", "352": "HKG", "356": "IND", "360": "IDN",
  "364": "IRN", "368": "IRQ", "372": "IRL", "376": "ISR", "380": "ITA",
  "388": "JAM", "392": "JPN", "398": "KAZ", "400": "JOR", "404": "KEN",
  "408": "PRK", "410": "KOR", "414": "KWT", "417": "KGZ", "418": "LAO",
  "422": "LBN", "426": "LSO", "428": "LVA", "430": "LBR", "434": "LBY",
  "438": "LIE", "440": "LTU", "442": "LUX", "446": "MAC", "450": "MDG",
  "454": "MWI", "458": "MYS", "462": "MDV", "466": "MLI", "470": "MLT",
  "474": "MTQ", "478": "MRT", "480": "MUS", "484": "MEX", "492": "MCO",
  "496": "MNG", "498": "MDA", "500": "MSR", "504": "MAR", "508": "MOZ",
  "512": "MMR", "516": "NAM", "520": "NRU", "524": "NPL", "528": "NLD",
  "540": "NCL", "548": "VUT", "554": "NZL", "558": "NIC", "562": "NER",
  "566": "NGA", "570": "NIU", "574": "NFK", "578": "NOR", "580": "MNP",
  "581": "UMI", "583": "FSM", "584": "MHL", "585": "PLW", "586": "PAK",
  "591": "PAN", "598": "PNG", "600": "PRY", "604": "PER", "608": "PHL",
  "612": "PCN", "616": "POL", "620": "PRT", "624": "GNB", "626": "TLS",
  "630": "PRI", "634": "QAT", "638": "REU", "642": "ROU", "643": "RUS",
  "646": "RWA", "654": "SHN", "659": "KNA", "662": "LCA", "670": "VCT",
  "674": "WSM", "678": "SMR", "682": "STP", "686": "SAU", "688": "SEN",
  "690": "SRB", "694": "SYC", "702": "SLE", "704": "SGP", "705": "SVK",
  "706": "SVN", "710": "ZAF", "716": "ZWE", "724": "ESP", "728": "SSD",
  "729": "SDN", "740": "SUR", "744": "SJM", "748": "SWZ", "752": "SWE",
  "756": "CHE", "760": "SYR", "762": "TJK", "764": "THA", "768": "TGO",
  "772": "TKL", "776": "TON", "780": "TTO", "784": "ARE", "788": "TUN",
  "792": "TUR", "795": "TKM", "796": "TCA", "798": "TUV", "800": "UGA",
  "804": "UKR", "807": "MKD", "818": "EGY", "826": "GBR", "831": "GGY",
  "832": "JEY", "833": "IMN", "834": "TZA", "840": "USA", "850": "VIR",
  "858": "URY", "860": "UZB", "862": "VEN", "876": "WLF", "882": "WSM",
  "887": "YEM", "894": "ZMB"
};
  
// Gerçek veri kaynakları (25 gösterge) – CO2 ve HIV çıkarıldı çünkü veri sorunu yaratıyordu.
const DATA_SOURCES = {
  GDP: {
    name: "Kişi Başı GSYİH (USD)",
    indicator: "NY.GDP.PCAP.CD",
    colorRange: ["#e0f3f8", "#0868ac"]
  },
  POPULATION: {
    name: "Nüfus",
    indicator: "SP.POP.TOTL",
    colorRange: ["#fee8c8", "#e34a33"]
  },
  UNEMPLOYMENT: {
    name: "İşsizlik Oranı (%)",
    indicator: "SL.UEM.TOTL.ZS",
    colorRange: ["#fff5cc", "#cc3300"]
  },
  INFLATION: {
    name: "Enflasyon Oranı (%)",
    indicator: "FP.CPI.TOTL.ZG",
    colorRange: ["#e6f9e6", "#006600"]
  },
  EXPORTS: {
    name: "İhracat Değeri (USD)",
    indicator: "NE.EXP.GNFS.CD",
    colorRange: ["#f3e5f5", "#6a1b9a"]
  },
  IMPORTS: {
    name: "İthalat Değeri (USD)",
    indicator: "NE.IMP.GNFS.CD",
    colorRange: ["#fce4ec", "#ad1457"]
  },
  CURRENT_ACCOUNT: {
    name: "Cari Hesap Dengesi (USD)",
    indicator: "BN.CAB.XOKA.CD",
    colorRange: ["#e3f2fd", "#0d47a1"]
  },
  EXTERNAL_DEBT: {
    name: "Dış Borç Stoku (USD)",
    indicator: "DT.DOD.DECT.CD",
    colorRange: ["#e8f5e9", "#1b5e20"]
  },
  LIFE_EXPECTANCY: {
    name: "Doğumda Beklenen Yaşam Süresi (Yıl)",
    indicator: "SP.DYN.LE00.IN",
    colorRange: ["#e1f5fe", "#01579b"]
  },
  LITERACY: {
    name: "Okuryazarlık Oranı (%)",
    indicator: "SE.ADT.LITR.ZS",
    colorRange: ["#fff8e1", "#f57f17"]
  },
  POVERTY: {
    name: "Yoksulluk Oranı (%)",
    indicator: "SI.POV.DDAY",
    colorRange: ["#ffebee", "#b71c1c"]
  },
  AGRICULTURE: {
    name: "Tarımın GSYİH'ye Oranı (%)",
    indicator: "NV.AGR.TOTL.ZS",
    colorRange: ["#f1f8e9", "#33691e"]
  },
  INDUSTRY: {
    name: "Sanayinin GSYİH'ye Oranı (%)",
    indicator: "NV.IND.TOTL.ZS",
    colorRange: ["#e8eaf6", "#283593"]
  },
  SERVICES: {
    name: "Hizmetlerin GSYİH'ye Oranı (%)",
    indicator: "NV.SRV.TOTL.ZS",
    colorRange: ["#f3e5f5", "#4a148c"]
  },
  URBANIZATION: {
    name: "Şehirleşme Oranı (%)",
    indicator: "SP.URB.TOTL.IN.ZS",
    colorRange: ["#e0f2f1", "#004d40"]
  },
  CHILD_MORTALITY: {
    name: "5 Yaş Altı Ölüm Oranı (‰)",
    indicator: "SH.DYN.MORT",
    colorRange: ["#ffebee", "#b71c1c"]
  },
  CLEAN_WATER: {
    name: "Temiz Suya Erişim (%)",
    indicator: "SH.H2O.SAFE.ZS",
    colorRange: ["#e3f2fd", "#0d47a1"]
  },
  ELECTRICITY: {
    name: "Elektrik Erişimi (%)",
    indicator: "EG.ELC.ACCS.ZS",
    colorRange: ["#e8f5e9", "#1b5e20"]
  },
  FOREST: {
    name: "Ormanlık Alan (%)",
    indicator: "AG.LND.FRST.ZS",
    colorRange: ["#f1f8e9", "#33691e"]
  },
  MILITARY: {
    name: "Askeri Harcamalar (USD)",
    indicator: "MS.MIL.XPND.CD",
    colorRange: ["#fff3e0", "#e65100"]
  },
  HEALTH: {
    name: "Kişi Başı Sağlık Harcamaları (USD)",
    indicator: "SH.XPD.CHEX.PC.CD",
    colorRange: ["#fce4ec", "#880e4f"]
  },
  EDUCATION: {
    name: "Eğitim Harcamaları (% of GSYİH)",
    indicator: "SE.XPD.TOTL.GD.ZS",
    colorRange: ["#e8eaf6", "#283593"]
  }
};
  
// Soru havuzu – CO2 ve HIV çıkarıldı; toplam 23 soru.
const QUIZ_QUESTIONS = [
  { 
    correct: DATA_SOURCES.GDP.name, 
    options: [DATA_SOURCES.GDP.name, DATA_SOURCES.POPULATION.name, DATA_SOURCES.UNEMPLOYMENT.name, DATA_SOURCES.INFLATION.name] 
  },
  { 
    correct: DATA_SOURCES.POPULATION.name, 
    options: [DATA_SOURCES.POPULATION.name, DATA_SOURCES.GDP.name, DATA_SOURCES.LIFE_EXPECTANCY.name] 
  },
  { 
    correct: DATA_SOURCES.UNEMPLOYMENT.name, 
    options: [DATA_SOURCES.UNEMPLOYMENT.name, DATA_SOURCES.INFLATION.name, DATA_SOURCES.POVERTY.name, DATA_SOURCES.HEALTH.name] 
  },
  { 
    correct: DATA_SOURCES.INFLATION.name, 
    options: [DATA_SOURCES.INFLATION.name, DATA_SOURCES.UNEMPLOYMENT.name, DATA_SOURCES.MILITARY.name, DATA_SOURCES.EXPORTS.name] 
  },
  { 
    correct: DATA_SOURCES.EXPORTS.name, 
    options: [DATA_SOURCES.EXPORTS.name, DATA_SOURCES.IMPORTS.name, DATA_SOURCES.CURRENT_ACCOUNT.name, DATA_SOURCES.EXTERNAL_DEBT.name] 
  },
  { 
    correct: DATA_SOURCES.IMPORTS.name, 
    options: [DATA_SOURCES.IMPORTS.name, DATA_SOURCES.EXPORTS.name, DATA_SOURCES.POPULATION.name, DATA_SOURCES.MILITARY.name] 
  },
  { 
    correct: DATA_SOURCES.CURRENT_ACCOUNT.name, 
    options: [DATA_SOURCES.CURRENT_ACCOUNT.name, DATA_SOURCES.EXTERNAL_DEBT.name, DATA_SOURCES.GDP.name, DATA_SOURCES.UNEMPLOYMENT.name] 
  },
  { 
    correct: DATA_SOURCES.EXTERNAL_DEBT.name, 
    options: [DATA_SOURCES.EXTERNAL_DEBT.name, DATA_SOURCES.CURRENT_ACCOUNT.name, DATA_SOURCES.POVERTY.name, DATA_SOURCES.INFLATION.name] 
  },
  { 
    correct: DATA_SOURCES.LIFE_EXPECTANCY.name, 
    options: [DATA_SOURCES.LIFE_EXPECTANCY.name, DATA_SOURCES.LITERACY.name, DATA_SOURCES.POPULATION.name, DATA_SOURCES.HEALTH.name] 
  },
  { 
    correct: DATA_SOURCES.LITERACY.name, 
    options: [DATA_SOURCES.LITERACY.name, DATA_SOURCES.EDUCATION.name, DATA_SOURCES.LIFE_EXPECTANCY.name, DATA_SOURCES.POVERTY.name] 
  },
  { 
    correct: DATA_SOURCES.POVERTY.name, 
    options: [DATA_SOURCES.POVERTY.name, DATA_SOURCES.UNEMPLOYMENT.name, DATA_SOURCES.INFLATION.name, DATA_SOURCES.LITERACY.name] 
  },
  { 
    correct: DATA_SOURCES.AGRICULTURE.name, 
    options: [DATA_SOURCES.AGRICULTURE.name, DATA_SOURCES.INDUSTRY.name, DATA_SOURCES.SERVICES.name, DATA_SOURCES.FOREST.name] 
  },
  { 
    correct: DATA_SOURCES.INDUSTRY.name, 
    options: [DATA_SOURCES.INDUSTRY.name, DATA_SOURCES.AGRICULTURE.name, DATA_SOURCES.SERVICES.name, DATA_SOURCES.EXTERNAL_DEBT.name] 
  },
  { 
    correct: DATA_SOURCES.SERVICES.name, 
    options: [DATA_SOURCES.SERVICES.name, DATA_SOURCES.INDUSTRY.name, DATA_SOURCES.GDP.name, DATA_SOURCES.EDUCATION.name] 
  },
  { 
    correct: DATA_SOURCES.URBANIZATION.name, 
    options: [DATA_SOURCES.URBANIZATION.name, DATA_SOURCES.POPULATION.name, DATA_SOURCES.EXPORTS.name, DATA_SOURCES.HEALTH.name] 
  },
  { 
    correct: DATA_SOURCES.CHILD_MORTALITY.name, 
    options: [DATA_SOURCES.CHILD_MORTALITY.name, DATA_SOURCES.LIFE_EXPECTANCY.name, DATA_SOURCES.HEALTH.name, DATA_SOURCES.UNEMPLOYMENT.name] 
  },
  { 
    correct: DATA_SOURCES.CLEAN_WATER.name, 
    options: [DATA_SOURCES.CLEAN_WATER.name, DATA_SOURCES.ELECTRICITY.name, DATA_SOURCES.EDUCATION.name, DATA_SOURCES.LITERACY.name] 
  },
  { 
    correct: DATA_SOURCES.ELECTRICITY.name, 
    options: [DATA_SOURCES.ELECTRICITY.name, DATA_SOURCES.CLEAN_WATER.name, DATA_SOURCES.URBANIZATION.name, DATA_SOURCES.POPULATION.name] 
  },
  { 
    correct: DATA_SOURCES.FOREST.name, 
    options: [DATA_SOURCES.FOREST.name, DATA_SOURCES.AGRICULTURE.name, DATA_SOURCES.EXTERNAL_DEBT.name, DATA_SOURCES.MILITARY.name] 
  },
  { 
    correct: DATA_SOURCES.MILITARY.name, 
    options: [DATA_SOURCES.MILITARY.name, DATA_SOURCES.EXTERNAL_DEBT.name, DATA_SOURCES.INFLATION.name, DATA_SOURCES.IMPORTS.name] 
  },
  { 
    correct: DATA_SOURCES.HEALTH.name, 
    options: [DATA_SOURCES.HEALTH.name, DATA_SOURCES.EDUCATION.name, DATA_SOURCES.LIFE_EXPECTANCY.name, DATA_SOURCES.LITERACY.name] 
  },
  { 
    correct: DATA_SOURCES.EDUCATION.name, 
    options: [DATA_SOURCES.EDUCATION.name, DATA_SOURCES.HEALTH.name, DATA_SOURCES.LITERACY.name, DATA_SOURCES.UNEMPLOYMENT.name] 
  }
];
  
// remainingQuestions dizisi: Sorulmamış soruları saklamak için.
let remainingQuestions = QUIZ_QUESTIONS.slice();
  
// Rastgele soru seçimi (tekrar etmeme)
function getNextQuestion() {
  if (remainingQuestions.length === 0) {
    remainingQuestions = QUIZ_QUESTIONS.slice();
  }
  const randIndex = Math.floor(Math.random() * remainingQuestions.length);
  const question = remainingQuestions[randIndex];
  remainingQuestions.splice(randIndex, 1);
  return question;
}
  
let score = 0;
let totalQuestions = 0;
let currentQuestionObj;  // Şu anki soru nesnesi
let currentData;         // Şu anki soruya ait veri
let svg, projection, path, g;
  
// Tooltip global değişkeni
let tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);
  
// Yardımcı: Array'i karıştırır (Fisher–Yates algoritması)
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
  
// Mouseover ve mouseout – ülke hover efektleri (tooltip, stroke)
function mouseover(event, d) {
  let isoCode = numericToAlpha3[d.id];
  let value = currentData && currentData[isoCode] ? currentData[isoCode] : "No Data";
  let countryName = (d.properties && d.properties.name) ? d.properties.name : isoCode;
  
  tooltip.transition().duration(200).style("opacity", 0.9);
  tooltip.html("<strong>" + countryName + "</strong><br/>" + value)
    .style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY - 28) + "px");
  
  d3.select(this)
    .transition().duration(300).ease(d3.easeCubic)
    .style("stroke", "#fff")
    .style("stroke-width", "2");
}
  
function mouseout(event, d) {
  tooltip.transition().duration(500).style("opacity", 0);
  d3.select(this)
    .transition().duration(300).ease(d3.easeCubic)
    .style("stroke", null)
    .style("stroke-width", null);
}
  
// Global zoom: Mouse hareketine göre, mouse merkezdeyse hafif zoom uygulanır.
function addGlobalZoomEffect() {
    svg.on("mousemove", function(event) {
      // Mouse pointer koordinatlarını alıyoruz.
      const [mx, my] = d3.pointer(event);
      const scale = 1.15; // Sabit zoom oranı (hafif zoom)
      // Mouse konumunu merkez olarak alarak transform uyguluyoruz.
      g.attr("transform", `translate(${mx},${my}) scale(${scale}) translate(${-mx},${-my})`);
    })
    .on("mouseleave", function() {
      // Mouse ayrıldığında yumuşak geçişle orijinal hale dönüyoruz.
      g.transition().duration(300).ease(d3.easeCubic)
        .attr("transform", `translate(0,0) scale(1)`);
    });
  }
  
async function initialize() {
  svg = d3.select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  
  // Global zoom efektini ekliyoruz.
  addGlobalZoomEffect();
  
  // Projeksiyonu, world verisine göre tam ortalanacak şekilde ayarlıyoruz.
  const world = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
  projection = d3.geoNaturalEarth1();
  projection.fitSize([width, height], topojson.feature(world, world.objects.countries));
  
  path = d3.geoPath().projection(projection);
  
  // Harita yollarını içerecek grup oluşturuluyor.
  g = svg.append("g");
  
  g.selectAll("path")
    .data(topojson.feature(world, world.objects.countries).features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", path)
    .attr("fill", "#f0f0f0")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);
  
  loadNextQuestion();
}
  
async function loadNextQuestion() {
  currentQuestionObj = getNextQuestion();
  totalQuestions++;
  
  const dataSource = Object.values(DATA_SOURCES).find(d => d.name === currentQuestionObj.correct);
  
  let data = await fetchData(dataSource.indicator);
  if (!data) data = generateTestData(dataSource.indicator);
  currentData = data;
  
  let values = Object.values(data).map(v => +v);
  let minVal = d3.min(values);
  let maxVal = d3.max(values);
  if (minVal === maxVal) { maxVal = minVal + 1; }
  
  const colorScale = d3.scaleSequential(d3.interpolateLab(dataSource.colorRange[0], dataSource.colorRange[1]))
    .domain([minVal, maxVal]);
  
  g.selectAll(".country")
    .transition()
    .duration(1000)
    .attr("fill", d => {
      let isoCode = numericToAlpha3[d.id];
      let value = isoCode && data[isoCode] ? data[isoCode] : 0;
      return colorScale(value);
    });
  
  updateLegend(colorScale, minVal, maxVal, dataSource);
  updateUI();
}
  
async function fetchData(indicator) {
  try {
    const proxy = "https://api.allorigins.win/raw?url=";
    const perPage = 100;
    let page = 1;
    let totalPages = 1;
    let aggregatedData = {};
  
    do {
      const url = `https://api.worldbank.org/v2/country/all/indicator/${indicator}?format=json&date=2022&per_page=${perPage}&page=${page}&source=2`;
      const response = await fetch(proxy + encodeURIComponent(url));
      const data = await response.json();
      if (page === 1 && data[0] && data[0].pages) {
        totalPages = data[0].pages;
      }
      data[1].forEach(entry => {
        if (entry.countryiso3code && entry.value) {
          aggregatedData[entry.countryiso3code] = entry.value;
        }
      });
      page++;
    } while (page <= totalPages);
  
    return aggregatedData;
  } catch (error) {
    console.error("Veri çekme hatası:", error);
    return null;
  }
}
  
function generateTestData(indicator) {
  const baseData = {
    'NY.GDP.PCAP.CD': {
      'USA': 70200, 'CHN': 10500, 'IND': 2100,
      'DEU': 48500, 'JPN': 39300, 'BRA': 8900
    },
    'SP.POP.TOTL': {
      'USA': 331000000, 'CHN': 1439000000, 'IND': 1380000000,
      'IDN': 273500000, 'PAK': 220900000, 'BRA': 213000000
    }
  };
  
  let testData = baseData[indicator] || {};
  
  Object.values(numericToAlpha3).forEach(iso => {
    if (!(iso in testData)) {
      if (indicator === 'NY.GDP.PCAP.CD') {
        testData[iso] = Math.random() * 70000;
      } else if (indicator === 'SP.POP.TOTL') {
        testData[iso] = Math.random() * 1500000000;
      }
    }
  });
  return testData;
}
  
function updateLegend(colorScale, minVal, maxVal, dataSource) {
  svg.selectAll(".legend").remove();
  svg.select("defs").remove();
  
  const legendWidth = 200;
  const legendHeight = 10;
  
  const defs = svg.append("defs");
  const gradientId = "legend-gradient";
  const gradient = defs.append("linearGradient")
    .attr("id", gradientId)
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");
  
  const stops = d3.range(0, 1.01, 0.1);
  stops.forEach(t => {
    gradient.append("stop")
      .attr("offset", (t * 100) + "%")
      .attr("stop-color", colorScale(minVal + t * (maxVal - minVal)));
  });
  
  const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(20,${height - 40})`);
  
  legend.append("rect")
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .style("fill", "url(#" + gradientId + ")");
  
  legend.append("text")
    .attr("x", 0)
    .attr("y", -5)
    .attr("font-size", "10px")
    .text(d3.format(".2s")(minVal));
  
  legend.append("text")
    .attr("x", legendWidth)
    .attr("y", -5)
    .attr("text-anchor", "end")
    .attr("font-size", "10px")
    .text(d3.format(".2s")(maxVal));
  

}
  
function updateUI() {
  document.getElementById("questionText").textContent = "Bu harita neyin verisini gösteriyor?";
  document.getElementById("score").textContent = score;
  document.getElementById("questionNumber").textContent = `Soru ${totalQuestions}`;
  
  const shuffledOptions = shuffle([...currentQuestionObj.options]);
  document.getElementById("options").innerHTML = 
    shuffledOptions.map(opt => `<button onclick="checkAnswer('${opt}')">${opt}</button>`).join('');
}
  
function checkAnswer(selected) {
  const correct = selected === currentQuestionObj.correct;
  const buttons = document.querySelectorAll('#options button');
  
  buttons.forEach(btn => {
    btn.disabled = true;
    btn.classList.remove('correct', 'wrong');
    if (btn.textContent === currentQuestionObj.correct) {
      btn.classList.add('correct');
    } else if (btn.textContent === selected && !correct) {
      btn.classList.add('wrong');
    }
  });
  
  if (correct) score++;
  
  setTimeout(() => {
    loadNextQuestion();
  }, 2000);
}
  
function showFinalScore() {
  alert(`Oyun Bitti!\nSkorunuz: ${score} - Toplam Soru: ${totalQuestions}`);
}
  
initialize();
