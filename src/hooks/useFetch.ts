import { type } from "os";
import React, { useEffect, useState } from "react";

type FetchParams = {
    url: string,
    verb: string,
    data: any
};

export const useFetch = (params: FetchParams): any => {
    const [fetchResponse, setFetchResponse] = useState(undefined);

    useEffect(() => {

        fetch(params.url, {
            method: params.verb,
            body: params.data ? JSON.stringify(params.data) : undefined
        })
            .then((response) => response.json())
            .then(setFetchResponse)
            .catch((error) => {
                console.error(`Error: ${error}`)
            });

    }, []);

    return fetchResponse;
}