import React, {useState} from "react";
import ReactDOM from "react-dom";
import PieChart from "./PieChart";



export default function App() {



    const [theme, setTheme] = useState('dark')

    const dummyData = [
        {name: "Oranges", value: 22.3},
        {name: "Apples", value: 12.0},
        {name: "Pink Guavas", value: 17.5},
        {name: "Watermelons / Pineapples", value: 28.2},
        {name: "Others", value: 20.0}
    ]

    const handleThemeChange = () => {
        if (theme === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }


    return (
        <div className="App">
            <PieChart
                theme={theme}
                data={dummyData}
                handleThemeClick={handleThemeChange}
            />

        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
