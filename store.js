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