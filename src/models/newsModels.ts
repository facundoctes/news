export interface SearchResult {
    _type: string;
    didUMean: string;
    totalCount: number;
    relatedSearch: never[];
    value: News[];
}

export interface News {
    id: string;
    title: string;
    url: string;
    description: string;
    body: string;
    snippet: string;
    keywords: string;
    language: string;
    isSafe: boolean;
    datePublished: string;
    provider: Provider;
    image: Image;
}

export interface Provider {
    name: string;
    favIcon: string;
    favIconBase64Encoding: string;
}

export interface Image {
    url: string;
    height: number;
    width: number;
    thumbnail: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
    base64Encoding: number;
    name: string | null;
    title: string | null;
    provider: Provider,
    imageWebSearchUrl: string | null;
    webpageUrl: string;
}