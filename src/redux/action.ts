export const SET_DATA = 'SET_DATA';
export const SET_TAX_DATA = 'SET_TAX_DATA'

export const setData = (data: any) =>({
    type: SET_DATA,
    data
});

export const setTaxData = (taxData: any) =>({
    type: SET_TAX_DATA,
    taxData
})