function create(){
    let div=document.createElement("div");
    div.setAttribute('class','bg-dark container-fluid');
    document.body.append(div);
    let inp=document.createElement('input');
    inp.setAttribute('type','text');
    inp.setAttribute('class','search');
    inp.setAttribute('placeholder','Enter name here');
    div.append(inp);
    let btn=document.createElement('button');
    btn.setAttribute('type','submit');
    btn.setAttribute('class','searchbtn');
    btn.setAttribute('onclick','search(document.querySelector(".search").value)');
    btn.addEventListener('keyup',function(event){
        if(event.keyCode == 13){
            search(document.querySelector(".search").value);
            event.preventDefault();
            return true;
        }
    })
    btn.innerText="click here to search";
    div.append(btn);
}
async function search(name){
    try{
        let del=document.querySelector(".table");
        del.remove();
    }
    catch(err){
        console.log("catch");
    }
    try{
        let del2=document.querySelector(".alert");
        del2.remove();
    }
    catch(err){
        console.log("catch2");
    }
    try
    {
        var prom=await fetch(`https://api.nationalize.io?name=${name}`);
        let obj=await prom.json();
        let table=document.createElement('table');
        table.setAttribute('class','table table-md-3 table-sm-3 table-3');
        table.innerHTML=`<thead class="thead-dark">
        <tr>
        <th >No.</th>
        <th >Country Code</th>
        <th >Probability value</th>
        </tr>
    </thead>
    <tbody>
        <tr style="background-color:grey">
            <td>1</td>
            <td>${obj["country"][0]["country_id"]}</td>
            <td>${obj["country"][0]["probability"]}</td>
        </tr>
        <tr style="background-color:#80808052">
            <td>2</td>
            <td>${obj["country"][1]["country_id"]}</td>
            <td>${obj["country"][1]["probability"]}</td>
        </tr>
    </tbody>
    `
    document.body.append(table);
    }
    catch(err){
        let div=document.createElement("div");
        div.setAttribute('class','alert alert-danger alert-dismissible fade show');
        div.setAttribute('role','alert');
        let message=prom.status;
        switch(message){
            case 200:
                div.innerHTML=`<strong>Error occured! </strong>Name doesn't exist in the api :((
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>`
                break;
            case 401:
                div.innerHTML=`<strong>Unautherized! </strong>Invalid api key
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>`
                break;
            case 402:
                div.innerHTML=`<strong>Payment required! </strong>Subscription is not active
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>`
                break;
            case 422:
                div.innerHTML=`<strong>Unprocessable Entity! </strong>Missing 'name' parameter or Invalid 'name' parameter
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>`
            case 429:
                div.innerHTML=`<strong>Too Many Requests! </strong>Request limit reached or Request limit too low to process request
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>`
                break;
            default:
                div.innerHTML=`<strong>Error cannot be identified! </strong>:((
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>`

        }
        document.body.append(div);
    }
}
