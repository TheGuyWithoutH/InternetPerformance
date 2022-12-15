import React, {useState} from 'react';
import '../Assets/Styles/DataOverview.css';
import Stepper from "react-stepper-horizontal";

import '../Assets/Styles/SearchData.css'
import LocationSearch from '../Components/Search/LocationSearch';
import TimeFrameSearch from '../Components/Search/TimeFrameSearch';
import TableSearch from '../Components/Search/TableSearch';
import DiagramSearch from '../Components/Search/DiagramSearch';

const steps = [{title: 'Choose Location'}, {title: 'Choose Time Period'}, {title: 'Data Table'}, {title: 'Choose Diagram'}];

const Search = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const switchTab = (nextTab) => {
        setCurrentTab(nextTab);
    }

    const selectTab = (tab) => {
        switch (tab) {
            case 0:
                return (<LocationSearch tab={currentTab} switchTab={switchTab}/>)
            case 1:
                return (<TimeFrameSearch tab={currentTab} switchTab={switchTab}/>)
            case 2:
                return (<TableSearch tab={currentTab} switchTab={switchTab}/>)
            case 3:
                return (<DiagramSearch tab={currentTab} switchTab={switchTab}/>)
            default:
                return (<LocationSearch tab={currentTab} switchTab={switchTab}/>)
        }
    }

    return (
        <>
            <div className="search-main-header">
                <h1>Search Data</h1>
                <Stepper
                    steps={steps.map((s, i) => ({...s, onClick: () => switchTab(i)}))}
                    activeStep={currentTab}
                    activeColor={"#0CB4FB"}
                    completeColor={"#0CB4FB"}
                    completeBorderStyle="solid"
                    defaultColor={"#D6E2E7"}
                    defaultBarColor={"#D6E2E7"}
                    completeBarColor={"#0CB4FB"}
                    lineMarginOffset={5}
                />
            </div>
            <div className="search-main-content">
                {selectTab(currentTab)}
            </div>
        </>
    );
};

export default Search;