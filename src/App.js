import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import soap from 'soap';

const App = () => {
  const [name, setname] = useState([])
  const [age, setAge] = useState([])
  const [gender, setGender] = useState([])
  const [nation, setNation] = useState([])
  var data = '<?xml version="1.0" encoding="utf-8"?>\n<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n  <soap:Body>\n    <Multiply xmlns="http://tempuri.org/">\n      <intA>5</intA>\n      <intB>5</intB>\n    </Multiply>\n  </soap:Body>\n</soap:Envelope>'; 

  var config = {
      method: 'post',
      url: 'http://www.dneonline.com/calculator.asmx',
      headers: { 
        'Content-Type': 'text/xml; charset=utf-8', 
        'SOAPAction': 'http://tempuri.org/Multiply'
      },
      data : data
    };
    this.soap.createClient("/ACMEWebService?WSDL", function(err, client) {
      if (!err) 
        console.log(client);  // all methods are stored in client
    });

  const fetchCountry = () =>
  {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://www.dneonline.com/calculator.asmx', true);
    var sr = 
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<SOAP-ENV:Envelope ' + 
        'xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" ' + 
        'xmlns:main="https://webapi.allegro.pl/service.php" ' +
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
        '<SOAP-ENV:Body>' +
            '<main:DoGetCountriesRequest>' +
                '<main:countryCode>1</main:countryCode>' +
                '<main:webapiKey>xxxxxxxx</main:webapiKey>' +
            '</main:DoGetCountriesRequest>' +
        '</SOAP-ENV:Body>' +
    '</SOAP-ENV:Envelope>';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.response);
        }
    };
    xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
    xmlhttp.setRequestHeader('SOAPAction', 'http://tempuri.org/Multiply');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlhttp.send(data);
  }
  const fetchData = () => {
    const ageAPI = 'https://api.agify.io?name=' + name;
    const genderAPI = 'https://api.genderize.io?name=' + name;
    const nationAPI = 'https://api.nationalize.io?name=' + name;

    const getPersonAge = axios.get(ageAPI)
    const getPersonGender = axios.get(genderAPI)
    const getPersonNation = axios.get(nationAPI)
    axios.all([getPersonAge, getPersonGender, getPersonNation]).then(
      axios.spread((...allData) => {

        const allDataAge = allData[0].data.age
        const allDataGender = allData[1].data.gender
        const allDataNation = allData[2].data.country

        console.log(allDataAge)
        setAge(allDataAge)
        console.log(allDataGender)
        setGender(allDataGender)
        console.log(allDataNation)
        setNation(allDataNation)

        var html = "<table border='1|1'>";
for (var i = 0; i < allDataNation.length; i++) {
    html+="<tr>";
    html+="<td>"+allDataNation[i].country_id+"</td>";
    
    html+="</tr>";

}
html+="</table>";
document.getElementById("box").innerHTML = html;


      })
    )
  } 

  useEffect(() => {
     fetchData()
    // fetchCountry()
  }, [])
const onType = (e) => {
  setname(e.target.value)
  fetchData()

}
  return (
    <body>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="tinysoap-browser-min.js"></script>
    <div className="App">
      <input
      type = "text"
      placeholder = "enter search"
      onChange = {onType}
      />
      <div>
      userAge is: {age}
      </div>
      <div>
      userGender is: {gender}
      </div>
      <div id = "box">
      </div>
    </div>
    </body>
  );
}

export default App;
