import {badColor, countriesRu} from "../../shared/constants";

import {BarChartContainer} from "../../components/charts";
import {useGlobalContext} from "../../shared/context";
import {WorldActionTypes} from "../../shared/store";

const DeathsTodayPage = () => {
    const {worldStates} = useGlobalContext();
    const worldData = worldStates[WorldActionTypes.allCountriesData]
    if (!worldStates || !worldData || !worldStates[WorldActionTypes.countriesIds]) return <></>

    let maxValue = 0;
    const data = worldStates[WorldActionTypes.countriesIds]
        .filter(region => countriesRu.includes(region.name) && region.code !== "10000")
        .map((region) => {
            const casesToday = worldData[Number(region.code)].info.deathsDelta;
            maxValue = Math.max(casesToday, maxValue);
            return {
                x: worldData[Number(region.code)].info.name,
                y: casesToday
            }
        })

    return (
        <BarChartContainer
            key={1}
            color={badColor}
            title='Смертей сегодня'
            xKey="x"
            yKey="y"
            max={maxValue}
            data={data}/>
    )
}

export {DeathsTodayPage};