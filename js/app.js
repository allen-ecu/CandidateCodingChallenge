	//WEIQING MAO +61 4 3238 8818 PERTH WESTERN AUSTRALIA DUSTONLYPERTH@GMAIL.COM
	$(document).ready(function() 
    { 	
    	//load json file for numeracy_list
    	var url = "json/schools_numeracy_list.json";
    	//load to table ID
    	var containerID = "tableBody";
	    loadJSON(url,containerID);
    }); 
	
	// table head sorting
	$("th").click(function(event) { 
	    var cid = event.target.id.substring(2);
	    $("#tableData").tablesorter();
		$("#tableData").trigger("update");
		var sorting = [[cid,0]]; 
		//var sorting = [[0,0],[cid,0]];  
        $("#tableData").trigger("sorton",[sorting]);
		return false;
	});
	
	// use ajax load json via dropdown list 
	function selectSubject() {
		var selectElem = document.getElementById("subject");
		var optionElem = selectElem.options[selectElem.selectedIndex].value;
		var url;
		var containerID = "tableBody"; 
		emptyChild(containerID);

		switch(optionElem)
		{
		case "0":
		  document.getElementById("curDirVal").innerText = "Grammer Punctuation";
		  url = "json/schools_grammer_punctuation_list.json";
		  loadJSON(url,containerID);
		  break;
		case "1":
		  document.getElementById("curDirVal").innerText = "Numeracy";
		  url = "json/schools_numeracy_list.json";
		  loadJSON(url,containerID);
		  break;
		case "2":
		  document.getElementById("curDirVal").innerText = "Persuasive Writing";
		  url = "json/schools_persuasive_writing_list.json";
		  loadJSON(url,containerID);
		  break;
		case "3":
		  document.getElementById("curDirVal").innerText = "Reading";
		  url = "json/schools_reading_list.json";
		  loadJSON(url,containerID);
		  break;
		case "4":
		  document.getElementById("curDirVal").innerText = "Spelling";
		  url = "json/schools_spelling_list.json";
		  loadJSON(url,containerID);
		  break;
		default:
		  console.log("user selecting option error!");
		}	
	}
	
	// clear table before loading new data
	function emptyChild(nodeParent) {
		var myNode = document.getElementById(nodeParent);
		while (myNode.firstChild) {
		    myNode.removeChild(myNode.firstChild);
			}
	}	
	
	// ajax interface
	function loadJSON(url,containerID)
	{
	var xmlhttp;
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    var jsonObj = JSON.parse(xmlhttp.responseText);
	    //console.log(jsonObj);
	    dataHandler(jsonObj,containerID);
	    }
	  }
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
	}
	
	// json format handler
	function dataHandler(jsonObj,containerID) {
    		console.log("fetching jason data for table ID: "+containerID);
         	console.log("initial.");
			var arrayLength = jsonObj["schools"].length;
			var arrayDepth = 9;
			console.log("schools length:" + arrayLength);
			console.log("school depth:" + arrayDepth);
			// row data builder
			var tb = document.getElementById(containerID);
			var tdName = ["schoolName","latestY3","latestY5","latestY7","latestY9","rawGainY3Y5","factoredGainY3Y5","latestGainInGainY3Y5","glgY3Y5"];
 			for(var i = 0; i< arrayLength; i++)
 			{
	 			var tr = document.createElement('tr');
	 				for(var j = 0; j< tdName.length; j++)
		 			{
		 				if(j==0)
		 				{
				 			var td = document.createElement('td');
				 			td.innerText = jsonObj["schools"][i]["school"][tdName[j]];
				 		}
				 		else
				 		{
				 			var td = document.createElement('td');
				 			td.innerText = jsonObj["schools"][i][tdName[j]];
				 		}
		 				tr.appendChild(td);
		 			}
	 			tb.appendChild(tr);
 			}
			console.log("end.");
    }