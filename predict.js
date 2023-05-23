<script>
let numbers = [];
let roundCounter = 0;
const colorDict = {
37: 'green',
1: 'red',
2: 'black',
3: 'red',
4: 'black',
5: 'red',
6: 'black',
7: 'red',
8: 'black',
9: 'red',
10: 'black',
11: 'black',
12: 'red',
13: 'black',
14: 'red',
15: 'black',
16: 'red',
17: 'black',
18: 'red',
19: 'red',
20: 'black',
21: 'red',
22: 'black',
23: 'red',
24: 'black',
25: 'red',
26: 'black',
27: 'red',
28: 'black',
29: 'black',
30: 'red',
31: 'black',
32: 'red',
33: 'black',
34: 'red',
35: 'black',
36: 'red'
};

// Probability distribution object
let probabilityDistribution = {};


// Add a new data point
function addDataPoint() {
    let number = parseInt(document.getElementById("number").value);
    if (number >= 0 && number <= 36) {
        numbers.push(number);
        updateTable();
        updateRoundCounter();
        updateChart();
        updateStatistics();                
        storeNumberInArray(number);

        updateProbabilityDistribution(number);
    }
    document.getElementById("number").value = "";

}
let myArray = []; // Create an empty array
function storeNumberInArray(number) {
          
  myArray.push(number); // Add the number to the array

  console.log('Adding '+ number + ' to stores.');
  console.log(myArray);

  return myArray;
}

// Update the probability distribution
function updateProbabilityDistribution(number) {
if (probabilityDistribution.hasOwnProperty(number)) {
probabilityDistribution[number]++;
}
else{
probabilityDistribution[number] = 1;
}
} 

// Calculate the most likely number
function calculateMostLikelyNumber() {
let mostLikelyNumber;
let maxProbability = -1;

for (const number in probabilityDistribution) {
if (probabilityDistribution.hasOwnProperty(number)) {
const probability = probabilityDistribution[number];
if (probability > maxProbability) {
mostLikelyNumber = number;
maxProbability = probability;
}
}
}

return mostLikelyNumber;
}

// Update the round counter
function updateRoundCounter() {
    roundCounter++;
    document.getElementById("roundCounter").textContent = roundCounter;
}

// Update the table
function updateTable() {
    const tableBody = document.getElementById("numberList");
    const newRow = document.createElement("tr");
    const number = numbers[numbers.length - 1];
    const color = colorDict[number];
    const evenOdd = number % 2 === 0 ? 'even' : 'odd';
    newRow.innerHTML = `<td>${number}</td><td>${color}</td><td>${evenOdd}</td>`;
    tableBody.prepend(newRow);
}

let chart; // Declare a chart variable

function generateChartData() {
const colorCounts = {
black: 0,
red: 0,
green: 0
};

for (const number of numbers) {
const color = colorDict[number];
colorCounts[color]++;
}

const data = {
labels: Object.keys(colorCounts),
datasets: [{
data: Object.values(colorCounts),
backgroundColor: ['black', 'red', 'green']
}]
};

return data;
}



// Update the chart
function updateChart() {
const chartCanvas = document.getElementById("chart");
const chartData = generateChartData();

// Check if a chart instance already exists, and destroy it
if (chart) {
chart.destroy();
}

chart = new Chart(chartCanvas, {
type: 'pie',
data: chartData
});
}

function calculateStatistics() {
const colorCounts = {
black: 0,
red: 0,
green: 0
};
const evenOddCounts = {
even: 0,
odd: 0
};

for (const number of numbers) {
const color = colorDict[number];
const evenOdd = number % 2 === 0 ? 'even' : 'odd';
colorCounts[color]++;
evenOddCounts[evenOdd]++;
}

const colorStatistics = Object.entries(colorCounts).map(([color, count]) => {
const percentage = (count / numbers.length * 100).toFixed(2);
return {
color,
count,
percentage
};
});

const evenOddStatistics = Object.entries(evenOddCounts).map(([evenOdd, count]) => {
const percentage = (count / numbers.length * 100).toFixed(2);
return {
evenOdd,
count,
percentage
};
});

return {
colorStatistics,
evenOddStatistics
};
}



function updateStatistics() {
const colorStatistics = calculateStatistics().colorStatistics;
const evenOddStatistics = calculateStatistics().evenOddStatistics;

// Update color statistics
const colorStatsContainer = document.getElementById("colorStats");
colorStatsContainer.innerHTML = "";
for (const stat of colorStatistics) {
const { color, count, percentage } = stat;
const statElement = document.createElement("div");
statElement.textContent = `${color}: ${count} (${percentage}%)`;
colorStatsContainer.appendChild(statElement);
}

// Update even/odd statistics
const evenOddStatsContainer = document.getElementById("evenOddStats");
evenOddStatsContainer.innerHTML = "";
for (const stat of evenOddStatistics) {
const { evenOdd, count, percentage } = stat;
const statElement = document.createElement("div");
statElement.textContent = `${evenOdd}: ${count} (${percentage}%)`;
evenOddStatsContainer.appendChild(statElement);
}

const mostLikelyNumber = calculateMostLikelyNumber();
document.getElementById("mostLikelyNumber").textContent = mostLikelyNumber;

}
</script>