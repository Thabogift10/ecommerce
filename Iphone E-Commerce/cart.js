const read=()=>{
    let shopData = JSON.parse(localStorage.getItem('shop')) || []
    const tbody = document.getElementById('tbody')
    const totalCart = document.getElementById('total-cart')
    tbody.innerHTML = ''
    if(shopData.length === 0){
        tbody.innerHTML = '<h3>Your cart empty, get  yourself a new Iphone'
        tbody.style.padding = "20px "
        totalCart.innerText = '0'
        return
    }else{
        shopData.map((item, index)=>{
            const newRow = `
            <tr>
            <td data-label="Image"><img src="${item.image}" style="width:50px; height:auto; border-radius:5px; object-fit:contain"></td>
            <td data-label="Name">${item.name}</td>
            <td data-label="Price">Price: R${item.price}</td>
            <td data-label="Quantity" class="qty"> 
            <div style="display:flex; align-items:center; gap:10px; justify-content:center">
            <button class="qty-btn" onclick="updateQty(${index}, 'minus')" style="cursor:pointer;padding:2px 8px">-</button>
            <span>${item.qty}</span>
             <div style="display:flex; align-items:center; gap:10px; justify-content:center">
            <button class="qty-btn" onclick="updateQty(${index}, 'plus')" style="cursor:pointer;padding:2px 8px">+</button>
            </div>
            </td>
            <td data-label="Sub-Total">R${Number(item.price) *(item.qty || 1)}</td>
            <td data-label="Delete" ><button onclick="del(${index})" class="del-btn">Delete</button></td>
            </tr`
            tbody.innerHTML += newRow
        })
        const total = shopData.reduce((sum, item) =>{
            return sum + Number(item.price) *(item.qty || 1)
        }, 0)
        totalCart.innerText = total
    }
}
//quantity update function
const updateQty =(index, action)=>{
    let shopData = JSON.parse(localStorage.getItem('shop'))
    if(action === 'plus'){
        //increase the number
        shopData[index].qty += 1
    }else if(action === 'minus'){
        if(shopData[index].qty > 1){
            shopData[index].qty -= 1
        }else{
        shopData.splice(index,1)
        }
    }
    localStorage.setItem('shop', JSON.stringify(shopData))
    read()
}
const del =(index)=>{
    let shopData = JSON.parse(localStorage.getItem('shop')) || []
    shopData.splice(index, 1)
    localStorage.setItem('shop', JSON.stringify(shopData))
    read()
}
//checkout function
const checkOut =()=>{
    let shopData = JSON.parse(localStorage.getItem('shop')) || []
    if(shopData.length === 0){
        alert('Your cart is empty!')
        return
    }   
    //1.calculate the total for the message
    const totacart = shopData.reduce((sum, item)=>{
    return sum + Number(item.price) * (item.qty || 1)
    },0)
    //2.Build the message string 
    let message = "📦 New order from Bester store%0A"
    shopData.forEach((item) => {
        message += ` ${item.name}%0A`
        message += ` Qty: ${item.qty} | Price: R${item.price}%0A%0A`
    });
    message += `💰 Grand Total: R${totacart}`
    //3.Your WhatsApp
    let phoneNumber = "27673982305"
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank') 
}
read()