
const switchPage = document.getElementById('go-to-cart')
switchPage.addEventListener('click', ()=>{
    setTimeout(()=>{
        window.location.href = 'cart.html'
    }, 1000)
})
//async function for converting json to string
let shopData = []
async function loadData(){
    try {
        const res = await fetch('phones.json')
        const data = await res.json()
        shopData = data
        read(shopData)
    } catch (error) {
        console.error("Failed to fetch data from json file:",error)
    }
}
//counter function
const counter =()=>{
    let shopData = JSON.parse(localStorage.getItem('shop')) || []
    const counterSpan = document.getElementById('counter')
    if(counterSpan){
        counterSpan.innerText = shopData.length
        counterSpan.style.color = 'white'
    }
}
//read  function
const read =(display = shopData)=>{
    const container = document.getElementById('container')
    container.innerHTML = ''
        display.map((item)=>{
        const details = item.name[0]
        const imgPath = item.image[0].src
        const newContainer = `
        <div class="new-container">
        <img src="${imgPath}" class="image">
        <h3><u>${item.model}</u></h3>
        <div class="inner-container">
        <div class="pre-owned">
        <h3>PRE-OWNED</h3>
        <span>${details.preownedname}</span>
        <span>R${item.preownedprice}</span>
        <button onclick="create('${item.id}', '${details.preownedname}', ${item.preownedprice}, '${imgPath}')">Add to Cart</button>
        </div>
        <div class="new">
        <h3>NEW</h3>
        <span>${details.newphone}</span>
        <span>R${item.newprice}</span>
        <button onclick="create('${item.id}', '${details.newphone}', ${item.newprice}, '${imgPath}')">Add to Cart</button>
        </div>
        </div>
        </div>
        `
        container.innerHTML += newContainer
    })
    }

//create function
const create =(id,name,price, image)=>{
    let shopData = JSON.parse(localStorage.getItem('shop')) || []
    let uniqueId = id + name
    let search = shopData.find((item)=> item.uniqueId === uniqueId)
    if(search === undefined){
        //undefined(means not found/ does not exist)
        shopData.push({
        id:id,
        uniqueId : uniqueId,
        name: name,
        price: price,
        image: image,
        qty: 1
    })
    }else{
        //if found/ exist
        search.qty += 1
    }
    localStorage.setItem('shop', JSON.stringify(shopData))
    counter()
    alert("Added " + name + " to cart")
}
//filter function
const searchProduct =()=>{
    const search = document.getElementById('search').value.toLowerCase()
    const filterData = shopData.filter((item)=>{
        return item.model.toLowerCase().includes(search)
    })
    read(filterData)
}
loadData()
