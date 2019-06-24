const app = document.getElementById('root')

const navbar = document.createElement('div')
navbar.setAttribute('class', 'navbar')
navbar.style.backgroundColor = '#212F3C'
navbar.textContent = "Nina testar"
      
app.appendChild(navbar)


const container = document.createElement('div')
container.setAttribute('class', 'container')
container.style.backgroundColor = '#AEB6BF'
      
app.appendChild(container)

function invertColor(hexTripletColor) {
	var color = hexTripletColor;
	color = color.substring(1); // remove #
	color = parseInt(color, 16); // convert to integer
	color = 0xFFFFFF ^ color; // invert three bytes
	color = color.toString(16); // convert to hex
	color = ("000000" + color).slice(-6); // pad with leading zeros
	color = "#" + color; // prepend #
	return color;
}

function wc_hex_is_light(color) {
    const hex = color.replace('#', '');
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    return brightness > 155;
}


var request = new XMLHttpRequest()
request.open('GET', 'https://api.noopschallenge.com/hexbot?count=6', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
      
      data.colors.forEach(color => {
 	     console.log(color.value)
 	     const card = document.createElement('div')
 	     card.setAttribute('class', 'card')
 	     
 	     const h1 = document.createElement('h1')
 	     h1.textContent = color.value
 	     var myInverted = invertColor(color.value)
 	     h1.style.backgroundColor = color.value
      	 card.style.backgroundColor = myInverted
 	     
 	     const p = document.createElement('p')
 	     //p.style.color = "black"
 	     p.textContent = "Min inverterade färg är: " + myInverted

 	     if(wc_hex_is_light(color.value)){
 	     	//console.log("nu är det en ljus färg")
 	     	h1.style.color = "black"
 	     	p.style.color = "white"
 	     } else {
 	     	//console.log("nu är det en MÖRK färg")
 	     	h1.style.color = "white"
 	     	p.style.color = "black"
 	     }
 	     
	      container.appendChild(card)
	      card.appendChild(h1)
	      card.appendChild(p)
    })
    
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
    
  }
}

request.send()