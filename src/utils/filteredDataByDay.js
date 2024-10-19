export const getFilteredDataByDay = (dataset , startDate, endDate) => {
    const filteredDataByDay = dataset.filter(item => {
        if(!startDate && !endDate) return dataset
        const itemDate = new Date(item.Day);
        return itemDate >=new Date(startDate) && itemDate <= new Date(endDate);
    });
    return filteredDataByDay
}