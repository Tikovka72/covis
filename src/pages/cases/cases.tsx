import {badColor, countriesRu, diagramData} from "../../Constants";
import {getMainData} from "../../shared/utils/getters";

import {BarChartContainer} from "../../components/charts/barChart/barChartContainer";
import {useGlobalContext} from "../../shared/context";
import {WorldActionTypes} from "../../shared/store";

const CasesPage = () => {
    const {worldStates} = useGlobalContext();
    const worldData = worldStates[WorldActionTypes.allCountriesData]
    if (!worldStates || !worldData || !worldStates[WorldActionTypes.countriesIds]) return <></>

    let maxValue = 0;
    const data = worldStates[WorldActionTypes.countriesIds]
        .filter(region => countriesRu.includes(region.name) && region.code !== "10000")
        .map((region) => {
            const cases = worldData[Number(region.code)].info.cases;
            maxValue = Math.max(cases, maxValue);
            return {
                x: worldData[Number(region.code)].info.name,
                y: cases
            }
        })

    return (
        <BarChartContainer
            key={1}
            color={badColor}
            title='Всего заболеваний'
            xKey="x"
            yKey="y"
            max={maxValue}
            data={data}/>
    )
}

export {CasesPage};