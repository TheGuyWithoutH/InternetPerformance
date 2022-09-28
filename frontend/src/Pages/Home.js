import network from '../Assets/Images/Network.png'
import DynamicButton from '../Components/DynamicButton';
import '../Assets/Styles/Home.css'


const Home = () => {
return(
    <div className="App">
            <header className="App-header">
            <img src={network} class="logo"/>
            <h1>Mapping Network Performance</h1>
            <h2>With User Application APIs</h2>
            <DynamicButton link={"about"} text={<p style={{margin: 0}}><b>+</b></p>} textOnHover={<p style={{margin: 0}}>I absolutly need these <b>Data</b></p>}/>
            </header>
        </div>
    )
}

export default Home;