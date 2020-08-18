import React,{useState,useEffect} from "react";
import "./styles.css";
import Side from "./Side";
import { BarChart, ColumnChart  } from 'react-chartkick'
import 'chart.js'

export default function App() {

  useEffect(() => { 
    api();
   },[]);
 
  const [Data,setData] = useState([]);
  // const [showNav, setShowNav] = useState(false);
  const [Confirmed,setConfirmed] = useState({});
  const [meta,setMeta] = useState({});
  const api = async () => {
    const response = await fetch(`https://api.covid19india.org/v4/min/data.min.json`);
    const raw = await response.json();
    const {TN} = raw
    const  rawmeta = TN.meta
    const m = {
       notes:rawmeta.notes,
       last_updated:rawmeta.last_updated
   }
  
   setMeta(m)
   
    const min = TN.total
    setData(min)
    const n = {
      con : addCommas(Data.confirmed),
      act: addCommas(Active),
      dec: addCommas(Data.deceased),
      rec: addCommas(Data.recovered),
    }
    setConfirmed(n)
  };
  
  const Active = Data.confirmed - (Data.recovered+Data.deceased)

   const addCommas = (nStr) => {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
     x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
   }
  
   const {con,act,dec,rec} = Confirmed
   
  //  let testBool = true; 

  //  function toggle() { 
  //   testBool = showNav ? false : true; 
  //   setShowNav(testBool)
  //   console.log(testBool)
  //  }
  const l = new Date(meta.last_updated).toGMTString()
  console.log(l)

  return (
    <>
    <div className="App">
      <div className="head">
        {/* <MenuIcon className="btn" onClick={() => toggle() } /> */}
        <h1>COVID19 - TN</h1>
      <Side />  
      </div>
    
    <div className="cards">
       <div className="card active">
         <h4>Active</h4>
         <h2>{act}</h2>
         <BarChart data={[["Active", Active]]}  width="180px" height="90px"  min={100} max={200000} />
      </div>
       <div className="card confirmed">
         <h4>Confirmed</h4>
         <h2>{con}</h2>
         <BarChart data={[["Confirmed", Data.confirmed]]}  width="180px" height="90px"  min={100} max={400000} />
        </div>
       <div className="card deceased">
         <h4>Deceased</h4>
         <h2>{dec}</h2>
         <BarChart data={[["Deceased", Data.deceased]]}  width="180px" height="90px"  min={100} max={20000} />
      </div>
       <div className="card recovered">
         <h4>Recovered</h4>
         <h2>{rec}</h2>
         <BarChart data={[["Recovered", Data.recovered]]}  width="180px" height="90px"  min={100} max={400000} />
        </div>
        <div className="below">
        <div className="meta">
        <div className="lastupdated">
          <h2>Tamil Nadu</h2>
        <p>{l}</p>
      </div>
       <p>{meta.notes}</p>
        </div>
      <div className="chart">
      <ColumnChart colors={["#6c757d", "#fff"]}  data={[["Confirmed", Data.confirmed ], ["Active",Active ],["Deceased", Data.deceased ], ["Recovered", Data.recovered ]]} width="400px" height="180px"  min={100} max={400000} />
      </div>
      </div>
      </div>
      

      <div className="footer">
        <div class="link">
          <a href="https://github.com/hjwasim" target="_blank" rel="noopener noreferrer">COVID-TN</a>
          </div>
          <h5>Stand against COVID19! Stay Safe </h5>
          <div class="links">
            <a href="https://github.com/hjwasim" class="github" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                 <a class="api" href="https://wazimtech.blogspot.com" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg></a>
                    <a href="https://twitter.com/hjwasim" target="_blank" rel="noopener noreferrer" class="twitter"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                      <a href="mailto:hjwasim001@gmail.com" class="mail" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline></svg></a></div>
      </div>
    </div>
    </>
  );
}
