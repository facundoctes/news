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
    const apiURI: string = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/';
    const endpoint: string = 'NewsSearchAPI';
    const apiKey: string = 'e28105562fmsh01edebafeeb6117p1f37e7jsn0221a314ae3d';
    const apiHost: string = 'contextualwebsearch-websearch-v1.p.rapidapi.com';

    const axiosInstance: AxiosInstance = axios.create({ baseURL: apiURI });

    const searchNews = (search: ISearchParameters) : Promise<SearchResult> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axiosInstance.get<SearchResult>(endpoint, {
                    headers: {
                        'x-rapidapi-key': apiKey,
                        'x-rapidapi-host': apiHost
                    },
                    params: search
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