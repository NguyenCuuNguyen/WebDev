//check if html document is ready 
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoader', ready) //html keep loading if not loaded
}else {
    ready()
}

function ready() {
    //add event to remove button
    var removeCartButton = document.getElementsByClassName('btn-danger') //document obj is everything inside html -> return all elements with button danger 
    //loop thru all buttons inside cart
    for (var i = 0; i < removeCartButton.length; i++){
        var button = removeCartButton[i]
        button.addEventListener('click', removeCartItem) //return an event, remove items from cart
    }
    
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChange) //anything input changes value
    }

    //add to cart button = item-button
    var addToCartButtons = document.getElementsByClassName('item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked) //anything input changes value
    }

    document.getElementsByClassName('button-purchase')[0].addEventListener('click', purchaseClicked)

}

function removeCartItem(event) {
    var buttonClicked = event.target //clicked button = target property of event
    buttonClicked.parentElement.parentElement.remove()  //cart-row to remove
    updateCartTotal()
}

//update total of cart. Go thru every row: add each row's price*quantity --> display in total
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0] //select first element of array, which wraps all the rows.
    var cartRows = cartItemContainer.getElementsByClassName('cart-row') //retrieve all cart-rows inside container
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        //get price and quantity elements for that row, not the actual num
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        //get actual price num and rid of $, convert to float number
        var price = parseFloat(priceElement.innerText.replace('$', '')) 
         //input has value, not innertext
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100)/100 //2 decimal places: *100 -> move decimal point 2 places to the right to round it, then bring it back to org place by /100 
    document.getElementsByClassName('cart-total-price')[0].innerText = '$'+total
}

function quantityChange(event) {
    var input = event.target //target of event is the actual input element
    //isNaN = check if is not a number
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement //repertoire-item
    var title = shopItem.getElementsByClassName('item-title')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    var imgSource = shopItem.getElementsByClassName('item-image')[0].src //source attribute of image
    //add a row to the cart
    addItemToCart(title, price, imgSource)
    updateCartTotal()
}

function addItemToCart(title, price, imgSource) {
    var cartRow = document.createElement('div')
    //add class of cart-row --> flex
    cartRow.classList.add('cart-row')
    //add the new div into div cart items
    var cartItems = document.getElementsByClassName('cart-items')[0]
    //get all cart item names to avoid multiple adding of same row/item
    var cartItemNames = document.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title){
            alert("This item is already added to the cart")
            return //exit out of the function (to line 73 ~)
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imgSource}">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1"> <!--without value, user can type input-->
            <button class="btn btn-danger" role="button">REMOVE</button>
        </div>  `  
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow) 
    //Tho btn-danger eventListener is added in ready() before fully loaded JS, newly added items' remove button is loaded after html is fully loaded
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChange)
}

function purchaseClicked() {
    alert("Thank you for your purchase!")
    //delete all the items in cart
    var cartItems = document.getElementsByClassName('cart-items')[0]
    //continually loop and remove all child items
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}