function ChargerInfo(el) {
  var code = el.value;
  var typeFichier = document.getElementById("typefichier").value; 
  var xmlhttp = new XMLHttpRequest(); 

  
  xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		  if (typeFichier === "json") {
			  
			var peintureInfoJson;
			  var jsonData = JSON.parse(this.responseText);

			  var peintures = jsonData.peinture;
			  
			  for (var i = 0; i < peintures.length; i++) {
				  if (peintures[i].code === code) {
					peintureInfoJson = peintures[i];

					document.getElementById("peinture").src = "img/" + peintureInfoJson.image;
					document.getElementById("titre").textContent = peintureInfoJson.titre;
					document.getElementById("artiste").textContent = peintureInfoJson.artiste;
					document.getElementById("prix").textContent = peintureInfoJson.prix;
					GetAndDisplayText(code);
				  }
			  }
		  } else if (typeFichier === "xml") {



			var xmlData = this.responseXML;

			var peintures = xmlData.getElementsByTagName("peinture");

			for(i = 0; i < peintures.length; i++) {
				if(peintures[i].getElementsByTagName("code")[0].firstChild.nodeValue === code) {
					document.getElementById("peinture").src = "img/" + peintures[i].getElementsByTagName("image")[0].firstChild.nodeValue;
					document.getElementById("titre").textContent = peintures[i].getElementsByTagName("titre")[0].firstChild.nodeValue;
					document.getElementById("artiste").textContent = peintures[i].getElementsByTagName("artiste")[0].firstChild.nodeValue;
					document.getElementById("prix").textContent = peintures[i].getElementsByTagName("prix")[0].firstChild.nodeValue;
					GetAndDisplayText(code);
					break;
				}
			}
		  }
	  }
  };

  
  if (typeFichier === "json") {
	  xmlhttp.open("GET", "ajax/peintures.json", true);
  } else if (typeFichier === "xml") {
	  xmlhttp.open("GET", "ajax/peintures.xml", true);
  }
  xmlhttp.send();
}



function GetAndDisplayText(code) {
	var xhr = new XMLHttpRequest();
	var information;
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {

			information = xhr.responseText;

			document.getElementById("info").textContent = information;
		}


	}
		xhr.open("GET", "ajax/" + code + ".txt", true);
		xhr.send();
		return information;

}