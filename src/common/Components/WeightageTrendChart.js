import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"

export const WeightageTrendChart = ({data, selectedTopic, startDate, endDate}) => {
    const selectedTopicArray = data.find(array => array.filter(obj => obj.Keywords[0] === selectedTopic).length > 0);
    console.log(selectedTopicArray)

    let reshapeData = []
    selectedTopicArray.forEach((elem) => {
        let date = new Date(elem.Date[0]); 
        reshapeData.push([date.getTime(), elem.Combined_weightage[0]])
    })

    console.log(reshapeData); 

    const months = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        months.push(new Date(currentDate));
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    const dataByMonth = {};
    reshapeData.forEach(dataPoint => {
        const date = new Date(dataPoint[0]);
        const month = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0');
        dataByMonth[month] = dataPoint[1];
    });

    const filledData = months.map(month => {
        const monthKey = month.getFullYear() + '-' + (month.getMonth() + 1).toString().padStart(2, '0');
        return [month.getTime(), dataByMonth[monthKey] || 0];
    });

    const options = {
        series: [{
            data: filledData,
            type: "line",
            name: `Weightage of "${selectedTopic}" overtime`
        }],
        title: {
            text: ''
        },
        xAxis: {
            type: "datetime"
        },
        yAxis: {
            title: {
              text: 'Weightage'
            }
        },
        tooltip: {
            formatter: function() {
              const date = new Date(this.x);
              const month = date.toLocaleString('default', { month: 'long' });
              const year = date.getFullYear();
              const value = this.y;
              return `<b>${month} ${year}</b><br>Weightage: ${value}`;
            }
        }
    }

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    )
}