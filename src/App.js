import {useState} from 'react';

import './App.css';
import {BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, LineChart, Line} from 'recharts';

const dataStates = {
    notRequested: 0,
    requested: 1,
    received: 2
}

const countries = {
    'USA': 'США',
    'India': 'Индия',
    'Brazil': 'Бразилия',
    'UK': 'Англия',
    'Russia': 'Россия',
    'Turkey': 'Турция',
    'France': 'Франция',
    'Iran': 'Иран',
    'Argentina': 'Аргентина',
    'Spain': 'Испания',
    'Colombia': 'Колумбия',
    'Italy': 'Италия',
    'Germany': 'Германия',
    'Indonesia': 'Индонезия',
    'Mexico': 'Мексика',
    'Poland': 'Польша',
    'South Africa': 'Южная Африка',
    'Philippines': 'Филипины',
    'Ukraine': 'Украина',
    'Malaysia': 'Малазия'
};

function RenderCountriesCases(props) {
    const id = 1;
    if (props.activeTab !== id) {
        return null;
    }

    const data = props.Data.map(d => {
        if (countries[d['country']]) {
            return {name: countries[d['country']], uv: 40, 'случаи': d['cases'], amt: 2100}
        }
        return null;
    }).filter(a => a);
    return (
        <div className='DiagramContainer'>
            <h2>Случаи заболевания по странам всего</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / 1.2} height={window.innerHeight / 1.4}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis width={80} domain={[0, data[0]['случаи'] + 1000000]}/>
                    <Tooltip/>
                    <Bar dataKey='случаи' barSize={70} fill="#8884d8">
                        {
                            data.map((d, index) => {
                                    if (d.name === 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={'#8884d8'}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={'#8882a8'}/>
                                }
                            )
                        }
                    </Bar>
                </BarChart>
            </div>
        </div>
    )
}

function RenderCountriesCasesToday(props) {
    const id = 2;
    if (props.activeTab !== id) {
        return null;
    }

    const data = props.Data.map(d => {
        if (countries[d['country']]) {
            return {name: countries[d['country']], 'случаев сегодня': d['todayCases']}
        }
        return null;
    }).filter(a => a);
    let sorted = data.slice();
    sorted.sort((a, b) => a['случаев сегодня'] - b['случаев сегодня'])
    return (
        <div className='DiagramContainer'>
            <h2>Случаи заболевания по странам сегодня</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / 1.2} height={window.innerHeight / 1.4}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis width={80} domain={[0, sorted[sorted.length - 1]['случаев сегодня'] + 1000]}/>
                    <Tooltip/>
                    <Bar dataKey='случаев сегодня' barSize={70} fill="#8884d8">
                        {
                            data.map((d, index) => {
                                    if (d.name === 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={'#8884d8'}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={'#8882a8'}/>
                                }
                            )
                        }
                    </Bar>
                </BarChart>
            </div>
        </div>
    )
}

function RenderCountriesRecovered(props) {
    const id = 3;
    if (props.activeTab !== id) {
        return null;
    }

    const data = props.Data.map(d => {
        if (countries[d['country']]) {
            return {name: countries[d['country']], 'выздоровело': d['recovered']}
        }
        return null;
    }).filter(a => a);
    let sorted = data.slice();
    sorted.sort((a, b) => a['выздоровело'] - b['выздоровело'])
    return (
        <div className='DiagramContainer'>
            <h2>Выздоровело по странам всего</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / 1.2} height={window.innerHeight / 1.4}
                          data={data}>
                    <XAxis dataKey="name" />
                    <YAxis width={80} domain={[0, sorted[sorted.length - 1]['выздоровело'] + 1000000]}/>
                    <Tooltip/>
                    <Bar dataKey='выздоровело' barSize={70} fill="#8884d8">
                        {
                            data.map((d, index) => {
                                    if (d.name === 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={'#8884d8'}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={'#8882a8'}/>
                                }
                            )
                        }
                    </Bar>
                </BarChart>
            </div>
        </div>
    )
}

function RenderCountriesRecoveredToday(props) {
    const id = 4;
    if (props.activeTab !== id) {
        return null;
    }

    const data = props.Data.map(d => {
        if (countries[d['country']]) {
            return {name: countries[d['country']], 'выздоровело сегодня': d['todayRecovered']}
        }
        return null;
    }).filter(a => a);
    let sorted = data.slice();
    sorted.sort((a, b) => a['выздоровело сегодня'] - b['выздоровело сегодня'])
    return (
        <div className='DiagramContainer'>
            <h2>Выздоровело сегодня</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / 1.2} height={window.innerHeight / 1.4}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis width={80} domain={[0, sorted[sorted.length - 1]['выздоровело сегодня'] + 1000]}/>
                    <Tooltip/>
                    <Bar dataKey='выздоровело сегодня' barSize={70} fill="#8884d8">
                        {
                            data.map((d, index) => {
                                    if (d.name === 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={'#8884d8'}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={'#8882a8'}/>
                                }
                            )
                        }
                    </Bar>
                </BarChart>
            </div>
        </div>
    )
}

function RenderCountriesTests(props) {
    const id = 5;
    if (props.activeTab !== id) {
        return null;
    }

    const data = props.Data.map(d => {
        if (countries[d['country']]) {
            return {name: countries[d['country']], 'тестов': d['tests']}
        }
        return null;
    }).filter(a => a);
    let sorted = data.slice();
    sorted.sort((a, b) => a['тестов'] - b['тестов'])
    return (
        <div className='DiagramContainer'>
            <h2>Всего тестов сделано</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / 1.2} height={window.innerHeight / 1.4}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis width={80} domain={[0, sorted[sorted.length - 1]['тестов'] + 10000000]}/>
                    <Tooltip/>
                    <Bar dataKey='тестов' barSize={70} fill="#8884d8">
                        {
                            data.map((d, index) => {
                                    if (d.name === 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={'#8884d8'}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={'#8882a8'}/>
                                }
                            )
                        }
                    </Bar>
                </BarChart>
            </div>
        </div>
    )
}

function RenderRussiaCasesHistory(props) {
    const id = 6;
    if (props.activeTab !== id) {
        return null;
    }
    const cases = Object.keys(props.Data['timeline']['cases']).map(d => {
        let date = new Date(d)
        let day = (date.getDate()).toString().padStart(2, '0')
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let year = date.getFullYear()
        return {name: `${day}-${month}-${year}`, 'Случаев': props.Data['timeline']['cases'][d]}
    })
    return (
        <div className='DiagramContainer'>
            <h2>Случаи заболевания по России за месяц</h2>
            <div className='BarChartContainer'>
                <LineChart className='BarChart' width={window.innerWidth / 1.2} height={window.innerHeight / 1.4}
                           data={cases}>
                    <Line type="monotone" dataKey="Случаев" stroke="#8884d8" activeDot={{ r: 12 }}/>
                    <CartesianGrid vertical={false} stroke="#ccc"/>
                    <XAxis dataKey="name"/>
                    <YAxis width={80}
                           domain={[cases[0]['Случаев'] - 100000, cases[cases.length - 1]['Случаев'] + 100000]}/>
                    <Tooltip/>
                </LineChart>
            </div>
        </div>
    )
}

function RenderRussiaRecoveryHistory(props) {
    const id = 7;
    if (props.activeTab !== id) {
        return null;
    }
    const cases = Object.keys(props.Data['timeline']['recovered']).map(d => {
        let date = new Date(d)
        let day = (date.getDate()).toString().padStart(2, '0')
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let year = date.getFullYear()
        return {name: `${day}-${month}-${year}`, 'Выздоровело': props.Data['timeline']['recovered'][d]}
    })
    return (
        <div className='DiagramContainer'>
            <h2>Случаи выздоровления по России за месяц</h2>
            <div className='BarChartContainer'>
                <LineChart className='BarChart' width={window.innerWidth / 1.2} height={window.innerHeight / 1.4}
                           data={cases}>
                    <Line type="monotone" dataKey="Выздоровело" stroke="#8884d8" activeDot={{ r: 12 }}/>
                    <CartesianGrid vertical={false} stroke="#ccc"/>
                    <XAxis dataKey="name"/>
                    <YAxis width={80}
                           domain={[cases[0]['Выздоровело'] - 100000, cases[cases.length - 1]['Выздоровело'] + 100000]}/>
                    <Tooltip/>
                </LineChart>
            </div>
        </div>
    )
}

function RenderRussiaDeathsHistory(props) {
    const id = 8;
    if (props.activeTab !== id) {
        return null;
    }
    const cases = Object.keys(props.Data['timeline']['deaths']).map(d => {
        let date = new Date(d)
        let day = (date.getDate()).toString().padStart(2, '0')
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let year = date.getFullYear()
        return {name: `${day}-${month}-${year}`, 'Смертей': props.Data['timeline']['deaths'][d]}
    })
    return (
        <div className='DiagramContainer'>
            <h2>Случаи смертей по России за месяц</h2>
            <div className='BarChartContainer'>
                <LineChart className='BarChart' width={window.innerWidth / 1.2} height={window.innerHeight / 1.4}
                           data={cases}>
                    <Line type="monotone" dataKey="Смертей" stroke="#8884d8" activeDot={{ r: 12 }}/>
                    <CartesianGrid vertical={false} stroke="#ccc"/>
                    <XAxis dataKey="name"/>
                    <YAxis width={80}
                           domain={[cases[0]['Смертей'] - 100000, cases[cases.length - 1]['Смертей'] + 100000]}/>
                    <Tooltip/>
                </LineChart>
            </div>
        </div>
    )
}

function RenderRussiaRegion(props) {
    function findRegionByStart(e) {
        updateRegion(e.target.value)
        if (names.includes(e.target.value.toLowerCase())) {
            return updateComplete(true)
        }
        return updateComplete(false)
    }

    async function searchRegion() {
        if (dataState === dataStates.requested) {
            return
        }
        updateDataState(dataStates.requested)
        let index = 1;
        for (let [name, i] in Object.entries(props.Data)) {
            if (name === region) {
                index = i;
                break;
            }
        }
        return fetch(`https://milab.s3.yandex.net/2020/covid19-stat/data/v10/data-by-region/${index}.json?`, {method: 'get'}).then((r) => {
            r.json().then(j => {
                updateData(j)
                updateDataState(dataStates.received)
            })
        })
    }

    let [complete, updateComplete] = useState(false);
    let [region, updateRegion] = useState(null);
    let [data, updateData] = useState(null);
    let [dataState, updateDataState] = useState(dataStates.notRequested)
    let names = props.Data.map(d => d.name.toLowerCase())
    const id = 9
    if (props.activeTab !== id) {
        return null;
    }
    let mainData = null;
    if (dataState === dataStates.requested) {
        mainData = <div>loading...</div>
    }
    if (dataState === dataStates.received) {
        let date = new Date(Date.now() - 30 * 3600 * 1000)
        let cases = data['cases'].slice(data['cases'].length - 32).map(d => {
            date.setDate(date.getDate() + 1)
            let day = (date.getDate()).toString().padStart(2, '0')
            let month = (date.getMonth()).toString().padStart(2, '0')
            let year = date.getFullYear()
            return {
                name: `${day}-${month}-${year}`, 'Случаев': d[0]
            }})

        date = new Date(Date.now() - 30 * 3600 * 1000)
        let deaths = data['deaths'].slice(data['deaths'].length - 32).map(d => {
            date.setDate(date.getDate() + 1)
            let day = (date.getDate()).toString().padStart(2, '0')
            let month = (date.getMonth()).toString().padStart(2, '0')
            let year = date.getFullYear()
            return {
                name: `${day}-${month}-${year}`, 'Смертей': d[0]
            }})
        mainData = <div>
            <div className='DiagramContainer'>
                <h2>Случаи заболевания по региону {region}</h2>
                <div className='BarChartContainer'>
                    <LineChart className='BarChart' width={window.innerWidth / 1.2} height={window.innerHeight / 1.4}
                               data={cases}>
                        <Line type="monotone" dataKey="Случаев" stroke="#8884d8" activeDot={{ r: 12 }}/>
                        <CartesianGrid vertical={false} stroke="#ccc"/>
                        <XAxis dataKey="name"/>
                        <YAxis width={80}
                               domain={[cases[0]['Случаев'] - 1000, cases[cases.length - 1]['Случаев'] + 1000]}/>
                        <Tooltip/>
                    </LineChart>
                </div>
            </div>
            <div className='DiagramContainer'>
                <h2>Случаи смертей по региону {region}</h2>
                <div className='BarChartContainer'>
                    <LineChart className='BarChart' width={window.innerWidth / 1.2} height={window.innerHeight / 1.4}
                               data={deaths}>
                        <Line type="monotone" dataKey="Смертей" stroke="#8884d8" activeDot={{ r: 12 }}/>
                        <CartesianGrid vertical={false} stroke="#ccc"/>
                        <XAxis dataKey="name"/>
                        <YAxis width={80}
                               domain={[deaths[0]['Смертей'] - 1000, deaths[cases.length - 1]['Смертей'] + 1000]}/>
                        <Tooltip/>
                    </LineChart>
                </div>
            </div>
        </div>
    }
    return <div>
        <input type='text' list='suggestions' onChange={findRegionByStart}/>
        <datalist id='suggestions'>
            {props.Data.map(d => {
                return <option key={d.code} id={d.code} value={d.name}/>
            })}
        </datalist>
        <button className='SearchButton' disabled={!complete} onClick={searchRegion}>Найти</button>
        {mainData}
    </div>

}

function App() {
    async function getCountriesCasesData() {
        updateAllCountriesCasesDataState(dataStates.requested)
        return fetch('https://disease.sh/v3/covid-19/countries?sort=cases&yesterday=1', {method: 'get'}).then((r) => {
            r.json().then((j) => {
                updateAllCountriesCases(j)
                updateAllCountriesCasesDataState(dataStates.received)
            })
        })
    }

    async function getRussiaCasesHistoryData() {
        updateRussiaCasesHistoryDataState(dataStates.requested)
        return fetch('https://disease.sh/v3/covid-19/historical/Russia?lastdays=30', {method: 'get'}).then((r) => {
            r.json().then((j) => {
                updateRussiaCasesHistory(j)
                updateRussiaCasesHistoryDataState(dataStates.received)
            })
        })
    }

    async function getRussiaRegionsData() {
        updateRussiaRegionsDataState(dataStates.requested)
        return fetch('https://milab.s3.yandex.net/2020/covid19-stat/data/v10/default_data.json', {method: 'get'}).then((r) => {
            r.json().then(j => {
                let data = Object.keys(j['russia_stat_struct']['data']).map(d => {
                    return {name: j['russia_stat_struct']['data'][d]['info']['name'].toString(), code: d}
                })
                updateRussiaRegions(data)
                updateRussiaRegionsDataState(dataStates.received)
            })
        })
    }

    // all countries cases
    const [allCountriesTab, updateAllCountriesTab] = useState(1);
    const [allCountriesCases, updateAllCountriesCases] = useState(null);
    const [allCountriesCasesDataState, updateAllCountriesCasesDataState] = useState(dataStates.notRequested);
    if (allCountriesCasesDataState === dataStates.notRequested) {
        let _ = getCountriesCasesData();
    }
    let alccdb = null;
    let alccdbt = null;
    let alcrd = null;
    let alcrdt = null;
    let alctd = null;
    if (allCountriesCasesDataState === dataStates.received) {
        alccdb = <RenderCountriesCases activeTab={allCountriesTab} Data={allCountriesCases}/>
        alccdbt = <RenderCountriesCasesToday activeTab={allCountriesTab} Data={allCountriesCases}/>
        alcrd = <RenderCountriesRecovered activeTab={allCountriesTab} Data={allCountriesCases}/>
        alcrdt = <RenderCountriesRecoveredToday activeTab={allCountriesTab} Data={allCountriesCases}/>
        alctd = <RenderCountriesTests activeTab={allCountriesTab} Data={allCountriesCases}/>
    }

    // russia cases history
    const [russiaRegions, updateRussiaRegions] = useState(null);
    const [russiaRegionsDataState, updateRussiaRegionsDataState] = useState(dataStates.notRequested);
    if (russiaRegionsDataState === dataStates.notRequested) {
        let _ = getRussiaRegionsData();
    }

    const [russiaCasesHistory, updateRussiaCasesHistory] = useState(null);
    const [russiaCasesHistoryDataState, updateRussiaCasesHistoryDataState] = useState(dataStates.notRequested);
    if (russiaCasesHistoryDataState === dataStates.notRequested) {
        let _ = getRussiaCasesHistoryData();
    }
    let rrd = null;
    if (russiaRegionsDataState === dataStates.received) {
        rrd = <RenderRussiaRegion activeTab={allCountriesTab} Data={russiaRegions}/>
    }

    let rch = null;
    let rrh = null;
    let rdh = null;
    if (russiaCasesHistoryDataState === dataStates.received) {
        rch = <RenderRussiaCasesHistory activeTab={allCountriesTab} Data={russiaCasesHistory}/>
        rrh = <RenderRussiaRecoveryHistory activeTab={allCountriesTab} Data={russiaCasesHistory}/>
        rdh = <RenderRussiaDeathsHistory activeTab={allCountriesTab} Data={russiaCasesHistory}/>
    } else {
        alccdb = null;
    }

    return (
        <div>
            <div>
                <h1>Статистика covid-19</h1>
            </div>
            <div className='Menu'>
                <h3>Мир</h3>
                <button className='MenuButton' onClick={() => updateAllCountriesTab(1)}>Всего заболеваний</button>
                <button className='MenuButton' onClick={() => updateAllCountriesTab(2)}>Заболеваний сегодня</button>
                <button className='MenuButton' onClick={() => updateAllCountriesTab(3)}>Всего выздоровело</button>
                <button className='MenuButton' onClick={() => updateAllCountriesTab(4)}>Выздоровело сегодня</button>
                <button className='MenuButton' onClick={() => updateAllCountriesTab(5)}>Тестов сделано</button>
                <h3>Россия</h3>
                <button className='MenuButton' onClick={() => updateAllCountriesTab(6)}>История заболеваний</button>
                <button className='MenuButton' onClick={() => updateAllCountriesTab(7)}>История выздоровлений</button>
                <button className='MenuButton' onClick={() => updateAllCountriesTab(8)}>История смертей</button>
                <button className='MenuButton' onClick={() => updateAllCountriesTab(9)}>Статистика по регионам</button>
            </div>
            <div className='Diagrams'>
                {alccdb}
                {alccdbt}
                {alcrd}
                {alcrdt}
                {alctd}
                {rch}
                {rrh}
                {rdh}
                {rrd}
            </div>
        </div>
    )
}

export default App;
