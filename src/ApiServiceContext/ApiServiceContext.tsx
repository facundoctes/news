import React from 'react';
import axios, { AxiosInstance } from "axios";
import { SearchResult } from '../models/newsModels';

interface ISearchParameters {
    q: string, 
    withThumbnails?: boolean, 
    page: number, 
    pageSize: number
}

interface IApiServiceContext {
    searchNews: (searh: ISearchParameters) => Promise<SearchResult>
};

const ApiServiceContext : React.Context<IApiServiceContext> = React.createContext<IApiServiceContext>(null!);

const ApiServiceContextProvider = (props:any) => {
    const axiosInstance: AxiosInstance = axios.create({ baseURL: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/' });

    const searchNews = (search: ISearchParameters) : Promise<SearchResult> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axiosInstance.get<SearchResult>('NewsSearchAPI', {
                    headers: {
                        'x-rapidapi-key': 'e28105562fmsh01edebafeeb6117p1f37e7jsn0221a314ae3d',
                        'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
                    },
                    params: {...search, withThumbnails: true}
                })

                if (response.status === 200) {
                    resolve(response.data)
                }

                reject(response)
            } catch (error) {
                reject(error)
            }
        }) 
    }
    
    const apiServiceContextValue: IApiServiceContext = {
        searchNews
    }

    return (
        <ApiServiceContext.Provider value={apiServiceContextValue}>
            {props.children}
        </ApiServiceContext.Provider>
    );
}

export { ApiServiceContextProvider, ApiServiceContext };