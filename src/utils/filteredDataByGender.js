export const getFilteredDataByGender = (dataset , gender) => {
    const filteredDataByGender = dataset.filter(item => {
        if(!gender) return dataset
        return item.Gender === gender
    })
    return filteredDataByGender
}