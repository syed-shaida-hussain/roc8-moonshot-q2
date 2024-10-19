export const getFilteredDataByAge = (dataset , age) => {
    const filteredDataByAge = dataset.filter(item => {
        if(!age) return dataset
        return item.Age === age
    })
    return filteredDataByAge
}