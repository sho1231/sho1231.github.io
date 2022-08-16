async function foo(){
    let prom=await fetch('https://restcountries.com/v2/alpha/IN');
    let obj=await prom.json();
    let body=document.querySelector('body');
    body.innerHTML=`<span class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="${cc.name}">${obj["country"][0]["country_id"]}</span>`
}