import {useState} from 'react';

import './App.css';
import RussiaSVG from './Russia'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
    LineChart,
    Line,
} from 'recharts';

const goodColor = '#00F067';
const badColor = '#CD5C5C'

let diagramWidth;
let diagramHeight;

if (window.innerWidth >= 800) {
    diagramWidth = 1.4;
    diagramHeight = 1.6;
} else {
    diagramWidth = 1.1;
    diagramHeight = 2.4;
}
const dataStates = {
    notRequested: 0,
    requested: 1,
    received: 2
}
const countriesRu = [
    'США', 'Индия', 'Бразилия', 'Великобритания', 'Россия', 'Турция', 'Франция', 'Иран', 'Аргентина',
    'Испания', 'Колумбия', 'Италия', 'Германия', 'Индонезия', 'Мексика', 'Польша', 'ЮАР', 'Филиппины', 'Украина'
]
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

    const data = Object.keys(props.Data).map(d => {
        if (countriesRu.includes(props.Data[d].info['name'])) {
            return {name: props.Data[d].info['name'], 'случаев заболевания': props.Data[d].info['cases']}
        }
        return null;
    }).filter(a => a);

    data.sort((a, b) => a.name.localeCompare(b.name))

    return (
        <div className='DiagramContainer'>
            <h2>Всего заболеваний</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / diagramWidth}
                          height={window.innerHeight / diagramHeight}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis width={80} domain={[0, data[0]['случаев заболевания'] + 1000000]}/>
                    <Tooltip/>
                    <Bar dataKey='случаев заболевания' barSize={70}>
                        {
                            data.map((d, index) => {
                                    if (d.name === 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={badColor} style={{opacity: 0.5}}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={badColor}/>
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

    const data = Object.keys(props.Data).map(d => {
        if (countriesRu.includes(props.Data[d].info['name'])) {
            return {name: props.Data[d].info['name'], 'случаев заболевания сегодня': props.Data[d].info['cases_delta']}
        }
        return null;
    }).filter(a => a);

    data.sort((a, b) => a.name.localeCompare(b.name))

    let sorted = data.slice();
    sorted.sort((a, b) => a['случаев заболевания сегодня'] - b['случаев заболевания сегодня'])
    return (
        <div className='DiagramContainer'>
            <h2>Заболеваний сегодня</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / diagramWidth}
                          height={window.innerHeight / diagramHeight}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis width={80} domain={[0, sorted[sorted.length - 1]['случаев заболевания сегодня'] + 1000]}/>
                    <Tooltip/>
                    <Bar dataKey='случаев заболевания сегодня' barSize={70}>
                        {
                            data.map((d, index) => {
                                    if (d.name === 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={badColor} style={{opacity: 0.5}}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={badColor}/>
                                }
                            )
                        }
                    </Bar>
                </BarChart>
            </div>
        </div>
    )
}

function RenderCountriesDeaths(props) {
    const id = 3;
    if (props.activeTab !== id) {
        return null;
    }

    const data = Object.keys(props.Data).map(d => {
        if (countriesRu.includes(props.Data[d].info['name'])) {
            return {name: props.Data[d].info['name'], 'случаев смертей': props.Data[d].info['deaths']}
        }
        return null;
    }).filter(a => a);

    data.sort((a, b) => a.name.localeCompare(b.name))

    return (
        <div className='DiagramContainer'>
            <h2>Всего заболеваний</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / diagramWidth}
                          height={window.innerHeight / diagramHeight}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis width={80} domain={[0, data[0]['случаев смертей'] + 1000000]}/>
                    <Tooltip/>
                    <Bar dataKey='случаев смертей' barSize={70}>
                        {
                            data.map((d, index) => {
                                    if (d.name === 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={badColor} style={{opacity: 0.5}}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={badColor}/>
                                }
                            )
                        }
                    </Bar>
                </BarChart>
            </div>
        </div>
    )
}

function RenderCountriesDeathsToday(props) {
    const id = 4;
    if (props.activeTab !== id) {
        return null;
    }

    const data = Object.keys(props.Data).map(d => {
        if (countriesRu.includes(props.Data[d].info['name'])) {
            return {name: props.Data[d].info['name'], 'случаев смертей сегодня': props.Data[d].info['deaths_delta']}
        }
        return null;
    }).filter(a => a);

    data.sort((a, b) => a.name.localeCompare(b.name))

    let sorted = data.slice();
    sorted.sort((a, b) => a['случаев смертей сегодня'] - b['случаев смертей сегодня'])
    return (
        <div className='DiagramContainer'>
            <h2>Заболеваний сегодня</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / diagramWidth}
                          height={window.innerHeight / diagramHeight}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis width={80} domain={[0, sorted[sorted.length - 1]['случаев смертей сегодня'] + 1000]}/>
                    <Tooltip/>
                    <Bar dataKey='случаев смертей сегодня' barSize={70}>
                        {
                            data.map((d, index) => {
                                    if (d.name === 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={badColor} style={{opacity: 0.5}}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={badColor}/>
                                }
                            )
                        }
                    </Bar>
                </BarChart>
            </div>
        </div>
    )
}

function RenderCountriesVaccines(props) {
    const id = 12;
    if (props.activeTab !== id) {
        return null;
    }
    let data = Object.keys(props.Data).map(d => {
        if (countriesRu.includes(props.Data[d]['name_ru'])) {
            return {name: props.Data[d]['name_ru'], 'вакцин сделано': props.Data[d]['vac']}
        }
        return null;
    }).filter(a => a);

    data.sort((a, b) => a.name.localeCompare(b.name))

    let sorted = data.slice();
    sorted.sort((a, b) => a['вакцин сделано'] - b['вакцин сделано'])
    return (
        <div className='DiagramContainer'>
            <h2>Вакцин сделано</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / diagramWidth}
                          height={window.innerHeight / diagramHeight}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis width={80} domain={[0, sorted[sorted.length - 1]['вакцин сделано'] + 10000000]}/>
                    <Tooltip/>
                    <Bar dataKey='вакцин сделано' barSize={70}>
                        {
                            data.map((d, index) => {
                                    if (d.name === 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={goodColor} style={{opacity: 0.5}}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={goodColor}/>
                                }
                            )
                        }
                    </Bar>
                </BarChart>
            </div>
        </div>
    )
}

function RenderCountriesFullVaccines(props) {
    const id = 13;
    if (props.activeTab !== id) {
        return null;
    }
    let data = Object.keys(props.Data).map(d => {
        if (countriesRu.includes(props.Data[d]['name_ru'])) {
            return {name: props.Data[d]['name_ru'], 'полных вакцин сделано': props.Data[d]['peop_full_vac']}
        }
        return null;
    }).filter(a => a);

    data.sort((a, b) => a.name.localeCompare(b.name))

    let sorted = data.slice();
    sorted.sort((a, b) => a['полных вакцин сделано'] - b['полных вакцин сделано'])
    return (
        <div className='DiagramContainer'>
            <h2>Вакцин сделано</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / diagramWidth}
                          height={window.innerHeight / diagramHeight}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis width={80} domain={[0, sorted[sorted.length - 1]['полных вакцин сделано'] + 10000000]}/>
                    <Tooltip/>
                    <Bar dataKey='полных вакцин сделано' barSize={70}>
                        {
                            data.map((d, index) => {
                                    if (d.name === 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={goodColor} style={{opacity: 0.5}}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={goodColor}/>
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
        return {name: `${day}-${month}-${year}`, 'заболеваний на данный день': props.Data['timeline']['cases'][d]}
    })
    return (
        <div className='DiagramContainer'>
            <h2>Заболеваний за месяц</h2>
            <div className='BarChartContainer'>
                <LineChart className='BarChart' width={window.innerWidth / diagramWidth}
                           height={window.innerHeight / diagramHeight}
                           data={cases}>
                    <Line type="monotone" dataKey="заболеваний на данный день" stroke={badColor} activeDot={{r: 12}}/>
                    <CartesianGrid vertical={false} stroke="#ccc"/>
                    <XAxis dataKey="name"/>
                    <YAxis width={80}
                           domain={[cases[0]['заболеваний на данный день'] - 100000, cases[cases.length - 1]['заболеваний на данный день'] + 100000]}/>
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
        return {name: `${day}-${month}-${year}`, 'выздоровлений на данный день': props.Data['timeline']['recovered'][d]}
    })
    return (
        <div className='DiagramContainer'>
            <h2>Выздоровлений за месяц</h2>
            <div className='BarChartContainer'>
                <LineChart className='BarChart' width={window.innerWidth / diagramWidth}
                           height={window.innerHeight / diagramHeight}
                           data={cases}>
                    <Line type="monotone" dataKey="выздоровлений на данный день" stroke={goodColor}
                          activeDot={{r: 12}}/>
                    <CartesianGrid vertical={false} stroke="#ccc"/>
                    <XAxis dataKey="name"/>
                    <YAxis width={80}
                           domain={[cases[0]['выздоровлений на данный день'] - 100000, cases[cases.length - 1]['выздоровлений на данный день'] + 100000]}/>
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
        return {name: `${day}-${month}-${year}`, 'смертей на данный день': props.Data['timeline']['deaths'][d]}
    })
    return (
        <div className='DiagramContainer'>
            <h2>Случаи смертей по России за месяц</h2>
            <div className='BarChartContainer'>
                <LineChart className='BarChart' width={window.innerWidth / diagramWidth}
                           height={window.innerHeight / diagramHeight}
                           data={cases}>
                    <Line type="monotone" dataKey="смертей на данный день" stroke={badColor} activeDot={{r: 12}}/>
                    <CartesianGrid vertical={false} stroke="#ccc"/>
                    <XAxis dataKey="name"/>
                    <YAxis width={80}
                           domain={[cases[0]['смертей на данный день'] - 100000, cases[cases.length - 1]['смертей на данный день'] + 100000]}/>
                    <Tooltip/>
                </LineChart>
            </div>
        </div>
    )
}

function RenderRussiaRegion(props) {
    function findRegionByStart(e) {
        updateRegion(e.target.value)

        updateSuggestions(names.map(r => {
            if (r.toLowerCase().startsWith(e.target.value.toLowerCase())) {
                return r
            }
            return null
        }).filter(a => a))

        if (names.includes(e.target.value.toLowerCase())) {
            return updateComplete(true)
        }
        return updateComplete(false)
    }

    async function searchRegion(reg) {
        if (dataState === dataStates.requested) {
            return
        }
        updateDataState(dataStates.requested)
        let index = 1;
        for (let i in Object.entries(props.Data)) {
            if (props.Data[i].name.toLowerCase() === reg.toLowerCase()) {
                index = props.Data[i].code;
                break;
            }
        }
        return fetch(`https://milab.s3.yandex.net/2020/covid19-stat/data/v10/data-by-region/${index}.json?`, {method: 'get'}).then((r) => {
            r.json().then(j => {
                updateData(j)
                updateFoundRegion(reg)
                updateDataState(dataStates.received)
            })
        })
    }

    let names = props.Data.map(d => d.name.toLowerCase())

    let [complete, updateComplete] = useState(false);
    let [region, updateRegion] = useState('');
    let [data, updateData] = useState(null);
    let [dataState, updateDataState] = useState(dataStates.notRequested)
    let [isSearch, updateIsSearch] = useState(0);
    let [suggestions, updateSuggestions] = useState(names);
    let [foundRegion, updateFoundRegion] = useState('');
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
                name: `${day}-${month}-${year}`, 'заболеваний на данный день': d[0]
            }
        })

        date = new Date(Date.now() - 30 * 3600 * 1000)
        let deaths = data['deaths'].slice(data['deaths'].length - 32).map(d => {
            date.setDate(date.getDate() + 1)
            let day = (date.getDate()).toString().padStart(2, '0')
            let month = (date.getMonth()).toString().padStart(2, '0')
            let year = date.getFullYear()
            return {
                name: `${day}-${month}-${year}`, 'смертей на данный день': d[0]
            }
        })
        mainData = <div>
            <div className='DiagramContainer'>
                <h2>Случаи заболевания по региону: {foundRegion}</h2>
                <div className='BarChartContainer'>
                    <LineChart className='BarChart' width={window.innerWidth / diagramWidth}
                               height={window.innerHeight / diagramHeight}
                               data={cases}>
                        <Line type="monotone" dataKey="заболеваний на данный день" stroke={badColor}
                              activeDot={{r: 12}}/>
                        <CartesianGrid vertical={false} stroke="#ccc"/>
                        <XAxis dataKey="name"/>
                        <YAxis width={80}
                               domain={[cases[0]['заболеваний на данный день'] - 1000, cases[cases.length - 1]['заболеваний на данный день'] + 1000]}/>
                        <Tooltip/>
                    </LineChart>
                </div>
            </div>
            <div className='DiagramContainer'>
                <h2>Случаи смертей по региону: {foundRegion}</h2>
                <div className='BarChartContainer'>
                    <LineChart className='BarChart' width={window.innerWidth / diagramWidth}
                               height={window.innerHeight / diagramHeight}
                               data={deaths}>
                        <Line type="monotone" dataKey="смертей на данный день" stroke={badColor} activeDot={{r: 12}}/>
                        <CartesianGrid vertical={false} stroke="#ccc"/>
                        <XAxis dataKey="name"/>
                        <YAxis width={80}
                               domain={[deaths[0]['смертей на данный день'] - 1000, deaths[cases.length - 1]['смертей на данный день'] + 1000]}/>
                        <Tooltip/>
                    </LineChart>
                </div>
            </div>
        </div>
    }

    let searchData = null;
    if (isSearch) {
        searchData = (
            <div className='RegionSuggestionBlock'>
                <button className='CloseButton' onClick={() => updateIsSearch(0)}>
                    <svg viewBox="0 0 40 40">
                        <path className="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30"/>
                    </svg>
                </button>
                <div className='RegionSuggestions'>
                    {suggestions.map((d, index) => <p onClick={(e) => {
                        updateRegion(d);
                        updateIsSearch(0);
                        searchRegion(d);
                    }} key={index}>{d}</p>)}
                </div>
            </div>
        )
    }
    return <div style={{width: '100%'}}>
        <div className='InputForm'>
            <input type='text' className='RegionInput' list='suggestions' value={region} onChange={findRegionByStart}
                   onFocus={() => updateIsSearch(1)}
                   placeholder='Введите регион'/>
            <button className='SearchButton' disabled={!complete} onClick={() => {
                searchRegion(region);
                updateIsSearch(0);
            }}>Найти
            </button>
        </div>
        {searchData}

        {mainData}
    </div>

}

function RenderRussiaCasesMap(props) {
    const [activeRegion, updateActiveRegion] = useState('');

    function onMapClick(e, region) {
        updateActiveRegion(region)
    }

    function getCasesByName(r) {
        for (let d of prepareData) {
            if (d.name === r) {
                return d.cases;
            }
        }
        return 0;
    }

    const id = 10
    if (props.activeTab !== id) {
        return null;
    }


    let prepareData = Object.keys(props.Data).map(d => {
        if (props.Data[d]['info']['name'] === "Россия" || props.Data[d]['info']['name'] === "Москва") {
            return null;
        }
        return props.Data[d]['info']
    }).filter(a => a);

    let sorted = prepareData.slice()
    sorted.sort(function (a, b) {
        return a['cases'] - b['cases']
    })

    let cssBlock = prepareData.map(d => {
        let name = d.name
        let opacity = Math.max(d.cases / d.population * 6, 0.05);
        let cssText = `polyline[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}
        polygon[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}
        g[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}
        path[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}`
        return <style type='text/css'>{cssText}</style>
    })

    let tt = <div className='MapToolTip' style={{color: 'transparent'}}><h4>1</h4><p>1</p></div>;
    if (activeRegion) {
        tt = <div className='MapToolTip'><h4>{activeRegion}</h4><p>случаев
            заболевания: {getCasesByName(activeRegion)}</p></div>
    }

    return <div style={{position: "relative"}}>
        {tt}
        {cssBlock}
        <RussiaSVG sendClick={onMapClick}/>
    </div>
}

function RenderRussiaDeathsMap(props) {
    const [activeRegion, updateActiveRegion] = useState('');

    function onMapClick(e, region) {
        updateActiveRegion(region)
    }

    function getCasesByName(r) {
        for (let d of prepareData) {
            if (d.name === r) {
                return d.deaths;
            }
        }
        return 0;
    }

    const id = 11
    if (props.activeTab !== id) {
        return null;
    }


    let prepareData = Object.keys(props.Data).map(d => {
        if (props.Data[d]['info']['name'] === "Россия" || props.Data[d]['info']['name'] === "Москва") {
            return null;
        }
        return props.Data[d]['info']
    }).filter(a => a);

    let sorted = prepareData.slice()
    sorted.sort(function (a, b) {
        return a['deaths'] - b['deaths']
    })

    let cssBlock = prepareData.map(d => {
        let name = d.name
        let opacity = Math.max(d.deaths / d.population * 200, 0.05);
        let cssText = `polyline[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}
        polygon[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}
        g[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}
        path[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}`
        return <style type='text/css'>{cssText}</style>
    })

    let tt = <div className='MapToolTip' style={{color: 'transparent'}}><h4>1</h4><p>1</p></div>;
    if (activeRegion) {
        tt = <div className='MapToolTip'><h4>{activeRegion}</h4><p>случаев смертей: {getCasesByName(activeRegion)}</p>
        </div>
    }

    return <div style={{position: "relative"}}>
        {tt}
        {cssBlock}
        <RussiaSVG sendClick={onMapClick}/>
    </div>
}

function App() {
    async function getRussiaCasesHistoryData() {
        updateRussiaCasesHistoryDataState(dataStates.requested)
        return fetch('https://disease.sh/v3/covid-19/historical/Russia?lastdays=30', {method: 'get'}).then((r) => {
            r.json().then((j) => {
                updateRussiaCasesHistory(j)
                updateRussiaCasesHistoryDataState(dataStates.received)
            })
        })
    }

    async function getCountriesAndRussianRegionsData() {
        updateRussiaRegionsDataState(dataStates.requested)
        return fetch('https://milab.s3.yandex.net/2020/covid19-stat/data/v10/default_data.json', {method: 'get'}).then((r) => {
            r.json().then(j => {
                updateAllCountriesCases(j['world_stat_struct']['data'])
                updateRussiaRegionsData(j['russia_stat_struct']['data'])
                updateAllCountriesVaccineData(j['vaccination_struct'])
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

    const [russiaRegions, updateRussiaRegions] = useState(null);
    const [russiaRegionsData, updateRussiaRegionsData] = useState(null);
    const [russiaRegionsDataState, updateRussiaRegionsDataState] = useState(dataStates.notRequested);

    let alccdb = null;
    let alccdbt = null;
    let alcrd = null;
    let alcrdt = null;
    let alctd = null;
    if (russiaRegionsDataState === dataStates.received) {
        alccdb = <RenderCountriesCases activeTab={allCountriesTab} Data={allCountriesCases}/>
        alccdbt = <RenderCountriesCasesToday activeTab={allCountriesTab} Data={allCountriesCases}/>
        alcrd = <RenderCountriesDeaths activeTab={allCountriesTab} Data={allCountriesCases}/>
        alcrdt = <RenderCountriesDeathsToday activeTab={allCountriesTab} Data={allCountriesCases}/>
    }

    const [allCountriesVaccineData, updateAllCountriesVaccineData] = useState(null);
    let acvd = null;
    let acfvd = null;
    if (russiaRegionsDataState === dataStates.received) {
        acvd = <RenderCountriesVaccines activeTab={allCountriesTab} Data={allCountriesVaccineData}/>
        acfvd = <RenderCountriesFullVaccines activeTab={allCountriesTab} Data={allCountriesVaccineData}/>
    }

    // russia cases history

    if (russiaRegionsDataState === dataStates.notRequested) {
        let _ = getCountriesAndRussianRegionsData();
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
    let rmc = null;
    let rmd = null;
    if (russiaCasesHistoryDataState === dataStates.received) {
        rch = <RenderRussiaCasesHistory activeTab={allCountriesTab} Data={russiaCasesHistory}/>
        rrh = <RenderRussiaRecoveryHistory activeTab={allCountriesTab} Data={russiaCasesHistory}/>
        rdh = <RenderRussiaDeathsHistory activeTab={allCountriesTab} Data={russiaCasesHistory}/>
        rmc = <RenderRussiaCasesMap activeTab={allCountriesTab} Data={russiaRegionsData}/>
        rmd = <RenderRussiaDeathsMap activeTab={allCountriesTab} Data={russiaRegionsData}/>
    } else {
        alccdb = null;
    }

    return (
        <div>
            <div className='Header'>
                <h1>co<span className='RedBack'>vis</span></h1>
            </div>
            <div className='Menu'>
                <div className='MenuSection'>
                    <h3 className='MenuHeader'>Мир</h3>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateAllCountriesTab(1)}>Всего заболеваний
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateAllCountriesTab(2)}>Заболеваний сегодня
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateAllCountriesTab(3)}>Всего смертей
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateAllCountriesTab(4)}>Смертей сегодня
                    </button>
                    <button className={['MenuButton', 'GoodButton'].join(' ')}
                            onClick={() => updateAllCountriesTab(12)}>Вакцин сделано
                    </button>
                    <button className={['MenuButton', 'GoodButton'].join(' ')}
                            onClick={() => updateAllCountriesTab(13)}>Количество полных вакцинаций
                    </button>
                </div>
                <div className='MenuSection'>
                    <h3 className='MenuHeader'>Россия</h3>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateAllCountriesTab(6)}>Заболеваний за месяц
                    </button>
                    <button className={['MenuButton', 'GoodButton'].join(' ')}
                            onClick={() => updateAllCountriesTab(7)}>Выздоровлений за месяц
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateAllCountriesTab(8)}>Смертей за месяц
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateAllCountriesTab(9)}>Поиск по регионам
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateAllCountriesTab(10)}>Заболевания на карте
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateAllCountriesTab(11)}>Смерти на карте
                    </button>
                </div>

            </div>
            <div className='Diagrams'>
                {alccdb}
                {alccdbt}
                {alcrd}
                {alcrdt}
                {alctd}
                {acvd}
                {acfvd}
                {rch}
                {rrh}
                {rdh}
                {rrd}
                {rmc}
                {rmd}
            </div>
        </div>
    )
}

export default App;
