async function getAll() {
    // const res = await fetch('https://botw-compendium.herokuapp.com/api/v2/category/treasure');
    // const data = await res.json();
    // // const treasure = data[0].category;
    // console.log(data)    
    // // console.log(treasure)    

    await fetch('https://botw-compendium.herokuapp.com/api/v2/all')
    .then((res) => res.json())
    .then(body => {
        const allData = body.data;
        console.log(allData);
    })
}

async function getAllTreasure() {
    await fetch('https://botw-compendium.herokuapp.com/api/v2/category/treasure')
    .then(res => res.json())
    .then(body => {
        const data = body.data;
        var treasures = [];
        for(var i in data) {
            treasures.push(data[i])
        }

        console.log(treasures)

        const itemDiv = document.getElementById('itemInfo')
        itemDiv.replaceChildren()
        for(var treasure in treasures) {
            const newItemDiv = document.createElement('div')
            newItemDiv.className = 'items'

            const newItemName = document.createElement('h3')
            newItemName.textContent = treasures[treasure].name

            const newItemDesc = document.createElement('p')
            newItemDesc.textContent = treasures[treasure].description

            const newItemImg = document.createElement('img')
            newItemImg.src = treasures[treasure].image

            newItemDiv.append(newItemName)
            newItemDiv.append(newItemDesc)
            newItemDiv.append(newItemImg)

            itemDiv.append(newItemDiv)

        }
    })
}

async function getAllEquip() {
    await fetch('https://botw-compendium.herokuapp.com/api/v2/category/equipment')
    .then(res => res.json())
    .then(body => {
        const data = body.data;
        var equips = [];
        for(var i in data) {
            if(data[i].attack == null || data[i].attack == 0) {}
            else equips.push(data[i]);
        }

        equips.sort(function(a, b) { // this sort function will sort the list by attack power, then further sort by id number thus persisting list order
            if(a.attack < b.attack) return -1;
            else if(a.attack > b.attack) return 1;
            else {
                if(a.id < b.id) return -1;
                else if(a.id > b.id) return 1;
                else return 0;
            }
        });

        //*
        // for(var i in equips){
            postEquipsData("http://localhost:5070/Product/Add/Product", equips[0])
            .then(data => {
                console.log(data)
            })
        // }
        // */

        console.log(equips)

        const itemDiv = document.getElementById('itemInfo')
        itemDiv.replaceChildren()
        for(var equip in equips) {
            const newItemDiv = document.createElement('div')
            newItemDiv.className = 'items'

            const newItemName = document.createElement('h3')
            newItemName.textContent = equips[equip].name

            const newItemDesc = document.createElement('p')
            newItemDesc.textContent = equips[equip].description

            const newItemImg = document.createElement('img')
            newItemImg.src = equips[equip].image

            newItemDiv.append(newItemName)
            newItemDiv.append(newItemDesc)
            newItemDiv.append(newItemImg)

            itemDiv.append(newItemDiv)

        }
    })
}

async function getAllMats() {
    await fetch('https://botw-compendium.herokuapp.com/api/v2/category/materials')
    .then(res => res.json())
    .then(body => {
        const data = body.data;
        
        var mats = [];
        for(var i in data) {
            if(data[i].description.includes('strength.')) mats.push(data[i])
        }

        mats.sort(function(a, b) { // this sort function will sort the list by attack power, then further sort by id number thus persisting list order
            if(a.attack < b.attack) return -1;
            else if(a.attack > b.attack) return 1;
            else {
                if(a.id < b.id) return -1;
                else if(a.id > b.id) return 1;
                else return 0;
            }
        });

        /*
        for(var i in mats){
            postMatsData("http://localhost:5070/Product/Add/Product", mats[i])
            .then(data => {
                console.log(data)
            })
        }
        // */

        console.log(mats)

        const itemDiv = document.getElementById('itemInfo')
        itemDiv.replaceChildren()
        for(var mat in mats) {
            const newItemDiv = document.createElement('div')
            newItemDiv.className = 'items'

            const newItemName = document.createElement('h3')
            newItemName.textContent = mats[mat].name

            const newItemDesc = document.createElement('p')
            newItemDesc.textContent = mats[mat].description

            const newItemImg = document.createElement('img')
            newItemImg.src = mats[mat].image

            newItemDiv.append(newItemName)
            newItemDiv.append(newItemDesc)
            newItemDiv.append(newItemImg)

            itemDiv.append(newItemDiv)

        }

    })
}

async function getItem(itemName) {
    await fetch('https://botw-compendium.herokuapp.com/api/v2/entry/' + itemName)
    .then(res => res.json())
    .then(body => {
        const item = body.data;
        console.log(item);

        const itemDiv = document.getElementById('itemInfo')
        
        itemDiv.replaceChildren()

        const newItemDiv = document.createElement('div')
        newItemDiv.className = 'items'

        const newItemName = document.createElement('h3')
        newItemName.textContent = item.name

        const newItemDesc = document.createElement('p')
        newItemDesc.textContent = item.description

        const newItemImg = document.createElement('img')
        newItemImg.src = item.image;

        newItemDiv.append(newItemName)
        newItemDiv.append(newItemDesc)
        newItemDiv.append(newItemImg)

        itemDiv.append(newItemDiv);
    })
}

async function postEquipsData(url = "", data = {}) {
    // config.EnableCors();
    console.log("Initializing fetch");
    try{
        const res = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
                // "Access-Control-Allow-Origin" : "*"
            },
            body: JSON.stringify({
                "productID": data.id,
                "name": data.name,
                "description": data.description,
                "price": (data.attack * 198),
                "powerIncrease": data.attack,
                "upgradeTotal": 0,
              })
        });
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

async function postMatsData(url = "", data = {}) {
    // config.EnableCors();
    console.log("Initializing fetch");
    try{
        const res = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
                // "Access-Control-Allow-Origin" : "*"
            },
            body: JSON.stringify({
                "productID": data.id,
                "name": data.name,
                "description": data.description,
                "price": (data.hearts_recovered * 400),
                "powerIncrease": (data.hearts_recovered * 400),
                "upgradeTotal": 0,
              })
        });
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}