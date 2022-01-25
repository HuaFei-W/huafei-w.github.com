let globalData;

async function getData(){
    const Davweather = await fetch('data/weather.json');
    const data = await Davweather.json();
    globalData = data;
    document.querySelector('#weather').innerHTML = outputHTML(data);
    document.querySelector('#picker').innerHTML = createSelectList(data);
}


function outputHTML(data){
    const html = `<p>`;
    return html;
}

function updateInterface (point,data){
    const bootstrap = [
        '<i class="bi bi-cloud-lightning-rain-fill"></i>',
        '<i class="far fa-sun" style="color:rgba(228, 171, 15, 0.918);"></i>',
        '<i class="bi bi-cloud-fog-fill" style="color:rgba(126, 121, 109, 0.918);"></i>',
    ];
    document.querySelector('#time').innerHTML = data[point].time;
    document.querySelector('#temp').innerHTML = data[point].temp;
    document.querySelector('#weather').innerHTML = bootstrap[data[point].weather];

    let html = '<p>';
    html += '<i class="far fa-angry "></i>';
    html += '</p>';
    // document.querySelector('#result').innerHTML = html;
    return html;
}

function createSelectList(data){
    let html = '<option>time</option>';
    const dataPoints = Object.keys(data);
    dataPoints.forEach( function(eachPoint){
        html += `<option value="${eachPoint}">${data[eachPoint].time}</option>`;
    } );
    return html;
}

document.querySelector("#picker").addEventListener('change',function(){
    const newValue = this.value;
    updateInterface(newValue, globalData);
} );

getData();





